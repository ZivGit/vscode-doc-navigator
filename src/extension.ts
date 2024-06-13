import { type ExtensionContext, window, commands, ViewColumn, Uri } from 'vscode';
import { NavigatorTreeDataProvider } from './docNavigatorTreeDataProvider';
import treeData from './treeData.json';

export function activate(context: ExtensionContext) {
  // Set context
  commands.executeCommand('setContext', 'docNavigator.viewType', 'viewsWelcome');

  /**
   * Register Provider
   */
  const navigatorTreeDataProvider = new NavigatorTreeDataProvider(treeData);
  const navigatorTreeDataRegister = window.registerTreeDataProvider(navigatorTreeDataProvider.viewType, navigatorTreeDataProvider);

  /**
   * Register Commands
   */
  const displayViewsWelcomeCommand = commands.registerCommand('docNavigator.toggleDisplay.viewsWelcome', () => commands.executeCommand('setContext', 'docNavigator.viewType', 'viewsWelcome'));
  const displayNavigatorCommand = commands.registerCommand('docNavigator.toggleDisplay.navigator', () => commands.executeCommand('setContext', 'docNavigator.viewType', 'navigator'));
  const eventNameItemClickedCommand = commands.registerCommand('docNavigator.eventName.itemClicked', (uri: string) => {
    commands.executeCommand(
      'simpleBrowser.api.open',
      Uri.parse(uri),
      { viewColumn: ViewColumn.Beside }
    );
  });

  context.subscriptions.push(
    displayViewsWelcomeCommand,
    displayNavigatorCommand,
    eventNameItemClickedCommand,
    navigatorTreeDataRegister
  );
}
