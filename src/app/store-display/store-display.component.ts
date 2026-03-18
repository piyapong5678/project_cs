import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {
  storeData: any = {};
  private url = `${APP_CONFIG.URL_BACKEND}/api/v1/store/get`;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res: any) => {
      this.storeData = res;
    });
  }

// สำหรับ iframe แผนที่ (ดึงที่อยู่จาก DB มาสร้างลิงก์)
  getMapUrl(): SafeResourceUrl {
    const address = `${this.storeData.subdistrict} ${this.storeData.district} ${this.storeData.province}`;
    // ใช้ Embed URL ของ Google Maps แบบค้นหาที่อยู่ (ไม่ต้องใช้ API Key)
    const baseUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30647.497115581486!2d103.24317548660754!3d16.22367105659348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3122a34c9f5da96b%3A0x5d72fac36f32d324!2z4Lia4Li14Lia4Li14Lib4Lil4Liy4LiV4Li54LmJ!5e0!3m2!1sth!2sth!4v1773819921344!5m2!1sth!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade=${encodeURIComponent(address)}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(baseUrl);
  }

  // สำหรับปุ่มนำทาง (เปิดหน้า Google Maps เต็มตัว)
  getDirectionUrl(): string {
    const query = `${this.storeData.storename} ${this.storeData.subdistrict} ${this.storeData.district}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }
}