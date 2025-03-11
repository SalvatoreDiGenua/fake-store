import {
  Component,
  effect,
  HostBinding,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-avatar',
  imports: [AvatarModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AvatarComponent {
  @HostBinding('class') class = 'host-fake-store-avatar';
  @HostBinding('style.--size-avatar.px') sizeAvatar = 200;

  icon = input<string>(null);
  image = input<string>(null);
  size = input<'normal' | 'large' | 'xlarge'>('normal');
  sizeNumber = input<number>(200);
  shape = input<'square' | 'circle'>('circle');

  updateSizeAvatar = effect(() => (this.sizeAvatar = this.sizeNumber()));
}
