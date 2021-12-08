import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  smiteDamage = {
    min: 0,
    max: 0,
    average: 0,
  };

  averageDamage = 0;
  smiteForm: FormGroup;
  gDamage = 399;
  hsMin = 105;
  hsMax = 108;
  smiteEd = 480;
  strEd = 194;
  fanaEd = 560;
  offEd = 0;
  sMin = 46;
  sMax = 46;

  ngOnInit() {
    this.smiteForm = new FormGroup({
      gDamage: new FormControl(this.gDamage),
      hsMin: new FormControl(this.hsMin),
      hsMax: new FormControl(this.hsMax),
      smiteEd: new FormControl(this.smiteEd),
      strEd: new FormControl(this.strEd),
      fanaEd: new FormControl(this.fanaEd),
      offEd: new FormControl(this.offEd),
      sMin: new FormControl(this.sMin),
      sMax: new FormControl(this.sMax),
    });

    this.smiteDamage = this.calcSmiteDamage(
      this.gDamage,
      this.sMin,
      this.sMax,
      this.hsMin,
      this.hsMax,
      this.smiteEd,
      this.strEd,
      this.fanaEd,
      this.offEd
    );

    this.smiteForm.valueChanges.subscribe((form) => {
      this.smiteDamage = this.calcSmiteDamage(
        form.gDamage,
        form.sMin,
        form.sMax,
        form.hsMin,
        form.hsMax,
        form.smiteEd,
        form.strEd,
        form.fanaEd,
        form.offEd
      );
    });
  }

  calcSmiteDamage(
    gDamage,
    sMin,
    sMax,
    hsMin,
    hsMax,
    smiteEd,
    strEd,
    fanaEd,
    offEd
  ) {
    let min =
      (sMin + hsMin + gDamage) * (1 + (smiteEd + strEd + fanaEd + offEd) / 100);
    let max =
      (sMax + hsMax + gDamage) * (1 + (smiteEd + strEd + fanaEd + offEd) / 100);
    return {
      min: min,
      max: max,
      average: (min + max) / 2,
    };
  }
}
