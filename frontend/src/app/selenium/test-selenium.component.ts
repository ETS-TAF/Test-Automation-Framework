import { Component } from '@angular/core';

@Component({
  selector: 'app-test-selenium',
  templateUrl: './test-selenium.component.html',
  styleUrls: ['./test-selenium.component.css']
})
export class TestSeleniumComponent {
    counter: number=1;
    actions: {
        id: number;
        action: string;
        object: string;
        input: string;
        target: string;
    }[] = [];

    
    actionChose(): void {
        const action = (document.getElementById('action') as HTMLSelectElement).value;
        const object = document.getElementById('object') as HTMLInputElement;
        const input = document.getElementById('input') as HTMLInputElement;
        const target = document.getElementById('target') as HTMLInputElement;
    
        object.disabled = true;
        input.disabled = true;
        target.disabled = true;
    
        if (action === "GoToUrl" || action === "FillField") {
            input.disabled = false;
        }
    
        if (action === "GetAttribute" || action === "GetPageTitle") {
            target.disabled = false;
        }
    
        if (action === "Clear" || action === "Click" || action === "IsDisplayed" || action === "FillField") {
            object.disabled = false;
        }
    }
    submitAction(){
        let action = (document.getElementById('action') as HTMLSelectElement).value;
        let object = (document.getElementById('object') as HTMLInputElement).value;
        let input = (document.getElementById('input') as HTMLInputElement).value;
        let target = (document.getElementById('target') as HTMLInputElement).value;
        this.addJsonObject({ id: this.counter, action: action, object: object, input: input, target: target, });
        console.log(this.getJsonObjectById(this.counter));
        this.counter++;
    }
    public addJsonObject(obj: { id: number,action: string,object: string,input: string,target: string }) {
        this.actions.push(obj);
    }
    
    public getJsonObjectById(id: number) {
        return this.actions.find(obj => obj.id === id);
    }
    
}
