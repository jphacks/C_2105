import { VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { FundRaisingList } from './page/FundRaisingList'
import { Layout } from './components/Layout'
import { LoadingOnFundraising } from './page/LoadingOnFundraising'
import { ResultFundRaising } from './page/ResultFundRaising'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: VFC = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={FundRaisingList} />
              <Route
                path="/:projectId/loading"
                component={LoadingOnFundraising}
              />
              <Route path="/:projectId/result" component={ResultFundRaising} />
            </Switch>
          </Layout>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
