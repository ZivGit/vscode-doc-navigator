import { type ExtensionContext, window, commands, ViewColumn, Uri } from 'vscode';
import { DocNavigatorTreeDataProvider } from './docNavigatorTreeDataProvider';
import treeData from './treeData.json';

export function activate(context: ExtensionContext) {
  // Set context
  commands.executeCommand('setContext', 'docNavigator.viewType', 'viewsWelcome');

  /**
   * Register Provider
   */
  const docNavigatorTreeDataProvider = new DocNavigatorTreeDataProvider(treeData);
  const docNavigatorTreeDataRegister = window.registerTreeDataProvider(docNavigatorTreeDataProvider.viewType, docNavigatorTreeDataProvider);

  /**
   * Register Commands
   */
  const displayViewsWelcomeCommand = commands.registerCommand('docNavigator.sidebar.toggleDisplay.viewsWelcome', () => commands.executeCommand('setContext', 'docNavigator.viewType', 'viewsWelcome'));
  const displayDocNavigatorCommand = commands.registerCommand('docNavigator.sidebar.toggleDisplay.docNavigator', () => commands.executeCommand('setContext', 'docNavigator.viewType', 'docNavigator'));
  const eventNameItemClickedCommand = commands.registerCommand('docNavigator.eventName.itemClicked', (uri: string) => {
    commands.executeCommand(
      'simpleBrowser.api.open',
      Uri.parse(uri),
      { viewColumn: ViewColumn.Beside }
    );
  });

  context.subscriptions.push(
    displayViewsWelcomeCommand,
    displayDocNavigatorCommand,
    eventNameItemClickedCommand,
    docNavigatorTreeDataRegister
  );
}
