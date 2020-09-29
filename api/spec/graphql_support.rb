module GraphqlSupport
  def graphql_execute(query, variables: {}, context:)
    ::ApiSchema.execute(query, variables: variables, context: context).to_h
  end
end
