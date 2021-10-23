import { VFC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { FundRaisingList } from './pages/FundRaisingList'
import { Layout } from './components/Layout'
import { LoadingOnFundraising } from './pages/LoadingOnFundraising'
import { ResultFundRaising } from './pages/ResultFundRaising'
import { ProjectProvider } from './context/ProjectProvider'

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
          <ProjectProvider>
            <Layout>
              <Switch>
                <Route exact path="/" component={FundRaisingList} />
                <Route
                  path="/:projectId/loading"
                  component={LoadingOnFundraising}
                />
                <Route
                  path="/:projectId/result"
                  component={ResultFundRaising}
                />
              </Switch>
            </Layout>
          </ProjectProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
