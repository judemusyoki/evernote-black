// # from envyaml import EnvYAML
// # schema: "${URL}"/api/graphql
// # overwrite: true
// # documents: 'graphql/**/*.graphql'
// # generates:
// #   ./graphql/generated.ts:
// #     plugins:
// #       - typescript
// #       - typescript-operations
// #       - typed-document-node
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  overwrite: true,
  documents: ['graphql/**/*.graphql'],
  generates: {
    './graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
}

export default config
