import * as vscode from 'vscode';
import * as path from 'path';

type TreeDataType = {
	label: string;
	description?: string | boolean;
	uri?: string;
	children?: TreeDataType[];
};

/**
 * Navigator
 *
 * @export
 * @class NavigatorTreeDataProvider
 * @implements {vscode.TreeDataProvider<Dependency>}
 */
export class NavigatorTreeDataProvider implements vscode.TreeDataProvider<Dependency> {
	public readonly viewType = "docNavigator.view.navigator";

	private _onDidChangeTreeData: vscode.EventEmitter<Dependency | undefined | null | void> = new vscode.EventEmitter<Dependency | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<Dependency | undefined | null | void> = this._onDidChangeTreeData.event;

	public treeData: TreeDataType[];

	public get treeItems(): Dependency[] {
		const getTreeItems = (items: TreeDataType[]): Dependency[] => items?.map((item) => {
			if (item?.children?.length) {
				return new Dependency(
					item.label,
					false,
					vscode.TreeItemCollapsibleState.Collapsed,
					undefined,
					getTreeItems(item?.children)
				);
			};
			return new Dependency(
				item.label,
				item?.description,
				vscode.TreeItemCollapsibleState.None,
				{
					command: 'docNavigator.eventName.itemClicked',
					title: 'DocNavigator: Item Clicked',
					arguments: [item.uri]
				}
			);
		});
		return getTreeItems(this.treeData);
	}

	constructor(treeData: TreeDataType[]) {
		this.treeData = treeData;
	}

	getTreeItem(element: Dependency): vscode.TreeItem {
		return element;
	}

	getChildren(element?: Dependency): vscode.ProviderResult<Dependency[]> {
		if (element) {
			return Promise.resolve(element?.children);
		}
		return Promise.resolve(this.treeItems);
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

/**
 * TreeItem
 *
 * @export
 * @class Dependency
 * @extends {vscode.TreeItem}
 */
export class Dependency extends vscode.TreeItem {

	readonly iconPath = {
		light: path.join(__filename, '..', '..', 'media', 'icons', 'svg', 'hat_icon.svg'),
		dark: path.join(__filename, '..', '..', 'media', 'icons', 'svg', 'hat_icon.svg')
	}

	readonly children?: Dependency[];

	constructor(
		label: string,
		description?: string | boolean,
		collapsibleState?: vscode.TreeItemCollapsibleState,
		command?: vscode.Command | undefined,
		children?: Dependency[]
	) {
		super(label, collapsibleState);
		this.description = description;
		this.command = command;

		if (children) {
			this.children = children;
		}
	}
}