import { Component } from '@angular/core';
import { HeaderComponent } from "./shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, Toast],
  providers: [MessageService]
})
export class AppComponent {
}
