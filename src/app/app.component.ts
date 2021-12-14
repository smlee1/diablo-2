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

  actualSmitePvpDamage = 0;

  averageDamage = 0;
  smiteForm: FormGroup;
  gDamage = 400;
  hsMin = 105;
  hsMax = 108;
  smiteEd = 480;
  strEd = 194;
  fanaEd = 560;
  offEd = 0;
  sMin = 46;
  sMax = 46;

  pvpDamageForm: FormGroup;
  damageReduction = 50;
  actualPvpDamage = 0;
  damage = 0;

  ngOnInit() {
    this.pvpDamageForm = new FormGroup({
      damage: new FormControl(this.damage),
      damageReduction: new FormControl(this.damage),
    });

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

    this.actualSmitePvpDamage = this.calcPvpDamage(
      this.smiteDamage.average,
      50
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
      this.actualSmitePvpDamage = this.calcPvpDamage(
        this.smiteDamage.average,
        50
      );
    });

    this.pvpDamageForm.valueChanges.subscribe((form) => {
      this.actualPvpDamage = this.calcPvpDamage(
        form.damage,
        form.damageReduction
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
    //(Shield Base + Holy Shield bonus + Grief bonus) * (1 + Smite %ED bonus + STR %ED bonus + Fanaticism %ED bonus + off-weapon %ED bonus) = Total damage
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

  calcPvpDamage(damage, damageReduction) {
    if (damageReduction < 1) {
      return damage / 6;
    }
    let damageReduced = (damage / 6) * (damageReduction / 100);
    return damage / 6 - damageReduced;
  }
}
