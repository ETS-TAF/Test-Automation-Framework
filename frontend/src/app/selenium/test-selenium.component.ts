import { Component, Renderer2, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-selenium',
  templateUrl: './test-selenium.component.html',
  styleUrls: ['./test-selenium.component.css']
})
export class TestSeleniumComponent {
    constructor(private http: HttpClient,private renderer: Renderer2, private el: ElementRef) { }
    testResult: any;
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
    percentage=0;

    runMethod(cases: any) {
        let counterTrue=0;
        const API_URL = 'http://localhost:8080/api/testselenium';
        this.showResultModal();
        this.showSpinner();
        this.http.post(API_URL, cases).subscribe(
        (response) => {
            console.log('tested successfully:', response);
            this.testResult=response;
            // for calculate the percentage of the success cases
            for(let result of  this.testResult){
                if(result.success){
                    counterTrue++;
                }
            }
            this.percentage=(counterTrue / this.testResult.length) * 100;
            this.hideSpinner();
        },
        (error) => {
            console.error('Error test:', error);
        }
        );
    }
    showResultModal(): void {
        const resultModal = this.el.nativeElement.querySelector('#modelResult');
        this.renderer.removeClass(resultModal, 'hideIt');
    }
    hideResultModal(): void {
        const resultModal = this.el.nativeElement.querySelector('#modelResult');
        this.renderer.addClass(resultModal, 'hideIt');
    }
    showSpinner():void {
        const resultModal = this.el.nativeElement.querySelector('#spinner');
        this.renderer.removeClass(resultModal, 'hideIt');
    }
    hideSpinner():void {
        const resultModal = this.el.nativeElement.querySelector('#spinner');
        this.renderer.addClass(resultModal, 'hideIt');
    }
        // for enable and disable inputs needed in actions form
    actionChose(): void {
        const action = (document.getElementById('action') as HTMLSelectElement).value;
        const object = document.getElementById('object') as HTMLInputElement;
        const input = document.getElementById('input') as HTMLInputElement;
        const target = document.getElementById('target') as HTMLInputElement;

        object.disabled = true;
        input.disabled = true;
        target.disabled = true;

        if (action === "1" || action === "2" || action === "3") {
            input.disabled = false;
        }

        if (action === "3" || action === "4") {
            target.disabled = false;
        }

        if (action === "5" || action === "6" || action === "7" || action === "2" || action === "3") {
            object.disabled = false;
        }
    }
    //add new case
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

    // add new action
    submitAction(){
        let action_id = parseInt((document.getElementById('action') as HTMLSelectElement).value);
        let action2 = (document.getElementById('action') as HTMLSelectElement);
        let action = action2.options[action2.selectedIndex].text;
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
