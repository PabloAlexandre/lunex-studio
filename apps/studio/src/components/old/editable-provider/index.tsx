import get from 'lodash/get';
import set from 'lodash/set';

import state from '../../templates/landing-01/default-state.json';

export class EditableProvider {
  private static instance: EditableProvider;
  public isEditable = false;
  private state?: Record<string, any> = state;
  public id?: string;

  private constructor() { }

  public static getInstance(): EditableProvider {
    if (!EditableProvider.instance) {
      EditableProvider.instance = new EditableProvider();
    }

    return EditableProvider.instance;
  }

  getValue(id: string, defaultValue?: string) {
    return get(this.state, id, defaultValue);
  }

  setInitialState(newState: Record<string, any>) {
    if(!this.isEditable) {
      this.state = newState;
    }
  }

  loadFromLocalStorage() {
    const state = localStorage.getItem('charles.content.'+this.id+'.state');

    if(state) {
      this.state = JSON.parse(state);
    }
  }

  saveOnCloud() {
    fetch('/api/publish', {
      method: 'POST',
      body: JSON.stringify({
        id: this.id,
        state: this.state,
      }),
    })
      .then((res) => res.json())
  }

  setField(path: string, value: any) {
    this.state = set(this.state as object, path, value);

    const serializableData = JSON.stringify(this.state);
    localStorage.setItem('charles.content.'+this.id+'.state', serializableData);
  }

  setId(id: string) {
    this.id = id;
  }

  setEditable(isEditable: boolean) {
    this.isEditable = isEditable;
  }
}