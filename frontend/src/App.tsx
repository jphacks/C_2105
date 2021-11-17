import { VFC, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { FundRaisingList } from './pages/FundRaisingList'
import { Layout } from './components/Layout'
import { ResultFundRaising } from './pages/ResultFundRaising'
import { ProjectProvider } from './context/ProjectProvider'
import { Background } from './components/animationComponents/Background'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: VFC = () => {
  useEffect(() => {
    document.title = 'スマート募金箱'
  }, [])

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProjectProvider>
            <Switch>
              <Route exact path="/" component={Background} />
              <Layout>
                <Route exact path="/project-list" component={FundRaisingList} />
                <Route
                  path="/:projectId/result"
                  component={ResultFundRaising}
                />
              </Layout>
            </Switch>
          </ProjectProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default App
