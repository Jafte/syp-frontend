import { Injectable } from '@angular/core';
import { WebApp} from '../telegram-web-app-sdk'
import { WebAppInitData } from '@twa-dev/types';

@Injectable({
  providedIn: 'root',
})
export class WebAppService {  
  
  getAppInitData() :string {
    return WebApp.initData;
  }

  getAppInitDataUnsafe() :WebAppInitData {
    return WebApp.initDataUnsafe;
  }
  
}
