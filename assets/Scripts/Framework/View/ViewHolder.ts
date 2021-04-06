import { _decorator, Component } from 'cc';
const { ccclass, property, disallowMultiple } = _decorator;

@ccclass('ViewHolder')
@disallowMultiple
export class ViewHolder extends Component {
    @property({type: [Component], tooltip: "需要访问的节点", displayName: "GameObject Refrences"})
    public gameObjects: (Component|null)[] = [];

    private _gameObjectMap: Map<string, Component> = new Map();

    onLoad() {
        this._mapGameObjects();
    }

    _mapGameObjects() {
        this._gameObjectMap.clear();
        if (this.gameObjects.length > 0) {
            for (const gameObject of this.gameObjects) {
                if (gameObject === null) {
                    continue;
                }
                const name = gameObject.name;
                this._gameObjectMap.set(name, gameObject);
            }
        }
    }

    getGameObjectWithName<T extends Component>(name: string) {
        return this._gameObjectMap.get(name) as T;
    }

    resetInEditor() {
        this.gameObjects = [];
        this._gameObjectMap.clear();
    }
}
