;(function () {

//    comment out one of the two next lines or different behaviours. Class only ==> session loads with error, export ==> no loading error
      class MyPlugin  {
//     export default class MyNoBuildPlugin {
          name = 'MyNoBuildPlugin'
        
        install(pluginManager) {
            const { ConfigurationSchema } = pluginManager.jbrequire('@jbrowse/core/configuration',)
            const WidgetType = pluginManager.jbrequire('@jbrowse/core/pluggableElementTypes/WidgetType',)
            const { ElementId } = pluginManager.jbrequire('@jbrowse/core/util/types/mst',)
            const { types } = pluginManager.jbrequire('mobx-state-tree')
            const React = pluginManager.jbrequire('react')
            const CiteWidget = props => {
               const header = React.createElement('h1',null,'Cite this JBrowse session',)
               const content = React.createElement('p',null,`Diesh, Colin, et al. "JBrowse 2: A modular genome browser with views of synteny and structural variation. bioRxiv. 2022.`,)
               return React.createElement('div', null, [header, content])}
        pluginManager.addWidgetType(() => {
            return new WidgetType({
                name: 'CiteWidget',
                heading: 'Cite this JBrowse session',
                configSchema: ConfigurationSchema('CiteWidget', {}),
                stateModel: types.model('CiteWidget', {id: ElementId, type: types.literal('CiteWidget'),}),
                ReactComponent: CiteWidget,
          })})}
          
        configure(pluginManager) {
            pluginManager.rootModel.insertMenu("Citations", 2)
            pluginManager.rootModel.appendToMenu("Citations", { label: 'Cite this JBrowse session', onClick: session => {const widget = session.addWidget('CiteWidget', 'citeWidget', {view: self,})
            session.showWidget(widget)
          },})}
  }

;(typeof self !== 'undefined' ? self : window).JBrowsePluginMyNoBuildPlugin = {default: MyPlugin,}
})()