import { Component, OnInit } from '@angular/core';
import { MicroService } from '../_services/micro.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  value: String | undefined = undefined;
  userUrl: string | undefined;
  selectedButton: string = 'fe';
  disabled: boolean = false;

  cards = [
    {
      title: 'Cas #1',
      subtitle: 'Affichage du bon contenu',
      content: `Si l'utilisateur clique sur le boutton nommé: `,
      content2: `On devrait voir l'élément suivant: `,
    },
    { title: 'Cas #2', subtitle: 'Un autre test', content: 'un autre test' },
    { title: 'Cas #3', subtitle: 'Un autre test', content: 'un autre test' },
  ];

  constructor(private microService: MicroService) {}

  ngOnInit(): void {}

  execute() {
    if (this.userUrl) {
      this.microService.executeTest(this.userUrl).subscribe((data) => {
        this.value = data;
      });
    }
  }
}
