import { setupDevToolsPlugin } from '@vue/devtools-api'
import type { App } from 'vue'

const stateType = 'routing properties'
const INSPECTOR_ID = 'test-inspector'

interface EventMap {
  type: string
  name: string
  config: string
}

function filterDatalayer(): EventMap[] {
  const data = window.dataLayer || []
  const events = data.filter((x) => {
    return x[0] === 'event'
  }).map((x) => {
    return {
      type: x[0],
      name: x[1],
      config: x[2]
    }
  })
  return events
}

export default function createDevTool(app: App) {
  setupDevToolsPlugin({
    id: 'example.com',
    app,
    label: 'Vue Analytics',
    homepage: 'example.com',
    // logo: null,
    componentStateTypes: [stateType]
  }, (api) => {
    api.addInspector({
      id: INSPECTOR_ID,
      label: 'Test inspector',
      icon: 'tab_unselected',
      treeFilterPlaceholder: 'Search for test...',
      actions: [
        {
          icon: 'star',
          tooltip: 'Test custom action',
          action: () => console.log('Meow! 🐱')
        }
      ],
      nodeActions: [
        {
          icon: 'star',
          tooltip: 'Test node custom action',
          action: nodeId => console.log('Node action:', nodeId)
        }
      ]
    })

    api.on.getInspectorTree((payload) => {
      if (payload.inspectorId === 'test-inspector') {
        payload.rootNodes = [
          {
            id: 'root',
            label: `Datalayer`,
            children: [
              {
                id: 'child',
                label: `Events ${payload.filter}`,
                tags: [
                  {
                    label: 'active',
                    textColor: 0x000000,
                    backgroundColor: 0xFF984F
                  },
                  {
                    label: 'test',
                    textColor: 0xffffff,
                    backgroundColor: 0x000000
                  }
                ]
              }
            ]
          }
        ]
      }
    })

    api.on.getInspectorState((payload) => {
      if (payload.inspectorId === 'test-inspector') {
        if (payload.nodeId === 'root') {
          payload.state = {
            'root info': [
              {
                key: 'events',
                value: filterDatalayer(),
                editable: true
              }
            ]
          }
        } else {
          payload.state = {
            'child info': [
              {
                key: 'answer',
                value: {
                  _custom: {
                    display: '42!!!',
                    value: window.dataLayer ?? [],
                    tooltip: 'The answer'
                  }
                }
              }
            ]
          }
        }
      }
    })
  })
}
