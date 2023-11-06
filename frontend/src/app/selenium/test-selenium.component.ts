import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-selenium',
  templateUrl: './test-selenium.component.html',
  styleUrls: ['./test-selenium.component.css']
})
export class TestSeleniumComponent {
    constructor(private http: HttpClient) { }

    counterAction: number=1;
    counterCase: number=0;
    cases : {
        case_id: number;
        caseName: string;
        actions: {
            action_id: number;
            action_type_id:number;
            action_type_name: string;
            object: string;
            input: string;
            target: string;
        }[] ;
    }[] = [];

    runMethod(cases: any) {
        const apiUrl = '/api/testselenium';
        this.http.get(apiUrl, cases).subscribe(
        (response) => {
            console.log('tested successfully:', response);
            
        },
        (error) => {
            console.error('Error test:', error);
        }
        );
    }
    
    actionChose(): void {
        const action = (document.getElementById('action') as HTMLSelectElement).innerText;
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
    submitCase(){
        this.counterCase++;
        let caseName = (document.getElementById('caseName') as HTMLSelectElement).value;
        this.addCase({ case_id: this.counterCase, caseName: caseName, actions: [] });
        (document.getElementById('caseName') as HTMLInputElement).value = '';
        (document.getElementById('close2') as HTMLButtonElement).click();
        this.counterAction=1;
        const addActionButton = document.getElementById('addActionButton') as HTMLInputElement;
        addActionButton.disabled = false;
    }
    
    
    public getCase(id: number) {
        return this.cases.find(obj => obj.case_id === id);
    }
    deleteCase(id: number) {
        this.cases = this.cases.filter(item => item.case_id !== id);
    }

    public addCase(obj: { case_id: number, caseName: string, actions: {action_id: number,action_type_id:number,action_type_name: string, object: string, input: string, target: string }[] }) {
        this.cases.push(obj);
    }

    submitAction(){
        let action_id = parseInt((document.getElementById('action') as HTMLSelectElement).value);
        let action = (document.getElementById('action') as HTMLSelectElement).innerText;
        let object = (document.getElementById('object') as HTMLInputElement).value;
        let input = (document.getElementById('input') as HTMLInputElement).value;
        let target = (document.getElementById('target') as HTMLInputElement).value;
        this.addAction({ action_id: this.counterAction,action_type_id: action_id, action_type_name: action, object: object, input: input, target: target, });
        console.log(this.getAction(this.counterAction));
        this.counterAction++;
        
        // Clear the input fields
        (document.getElementById('object') as HTMLInputElement).value = '';
        (document.getElementById('input') as HTMLInputElement).value = '';
        (document.getElementById('target') as HTMLInputElement).value = '';
        (document.getElementById('close') as HTMLButtonElement).click();
    }
    public addAction(obj: { action_id: number,action_type_id:number,action_type_name: string, object: string,input: string,target: string }) {
        this.getCase(this.counterCase)?.actions.push(obj);
    }
    
    public getAction(id: number) {
        return this.getCase(this.counterCase)?.actions.find(obj => obj.action_id === id);
    }
    deleteAction(caseId: number,actionId:number) {
        const currentCase = this.getCase(caseId);

        if (currentCase && currentCase.actions) {
            currentCase.actions = currentCase.actions.filter(item => item.action_id !== actionId);
        }
    }
    
    
    
}
