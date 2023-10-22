import { Component } from '@angular/core';

@Component({
  selector: 'app-test-selenium',
  templateUrl: './test-selenium.component.html',
  styleUrls: ['./test-selenium.component.css']
})
export class TestSeleniumComponent {
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
    
}
