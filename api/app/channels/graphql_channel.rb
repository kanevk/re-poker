class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    raise 'Already defined subscription ID' if @subscription_id

    @subscription_id = nil
  end

  def execute(data)
    query = data["query"]
    variables = ensure_hash(data["variables"])
    operation_name = data["operationName"]
    context = {
      # Re-implement whatever context methods you need
      # in this channel or ApplicationCable::Channel
      current_user: current_user,
      # Make sure the channel is in the context
      channel: self,
    }

    result = ApiSchema.execute(
      query,
      variables: variables,
      context: context,
      operation_name: operation_name
    )

    payload = {
      result: result.to_h,
      more: result.subscription?,
    }

    # Track the subscription here so we can remove it
    # on unsubscribe.
    @subscription_id = result.context[:subscription_id]
    unless @subscription_id
      raise "Missing subscription_id. Query: #{query};;\n variables: #{variables};;\n"
    end

    player = context.fetch(:current_room_player)
    player&.update!(active: true)

    transmit(payload)
  end

  def unsubscribed
    player = gql_context_for(@subscription_id).fetch(:current_room_player)
    player&.update!(active: false)

    ApiSchema.subscriptions.delete_subscription(@subscription_id)
  end

  private

  def gql_context_for(subscription_id)
    ApiSchema.subscriptions.read_subscription(subscription_id).fetch(:context)
  end

  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def current_user
    user_id = AuthToken.decode(params['token'])[:user_id]

    raise GraphQL::ExecutionError, "Wrong authentication token!" unless user_id

    User.find user_id
  end

end
