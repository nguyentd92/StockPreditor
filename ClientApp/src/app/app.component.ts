import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  schema =    {
    "@context": "http://schema.org/",
    "@type": "Organization",
    "name": "AI Stock Prediction",
    "description": "Dự đoán tăng trưởng giá cổ phiếu, cập nhật giá cổ phiếu hằng ngày, nhận định thị trường giá cổ phiếu",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Huế, Việt Nam",
      "postalCode": "530000",
      "streetAddress": "20 Lê Lợi"
    },
    "image": "http://smartdoc.vn/Content/images/logo.png",
    "email": "hitecdhh@gmail.com",
    "url": "http://stock.smartdoc.vn",
    "sponsor": {
      "@type": "Organization",
      "name": "SmartDoc",
      "url": "http://smartdoc.vn/"
    }
  }
}
