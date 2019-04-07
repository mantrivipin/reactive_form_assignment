import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-form-assignment';
  formSubmitted: boolean = false;
  projectForm: FormGroup;
  project = {
    name: '',
    email: '',
    status: ''
  }
  formInvalid: boolean = true;

  ngOnInit() {
    this.projectForm = new FormGroup({
      // 'project': new FormControl(null, [Validators.required, this.forbiddenName]),
      'project': new FormControl(null, Validators.required, this.asyncForbiddenName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable', Validators.required)
    });
    // this.projectForm.statusChanges.subscribe((value) => {
    //   if(value === 'VALID') {
    //     this.formInvalid = false;
    //   } else {
    //     this.formInvalid = true;
    //   }
    // });
  }

  onSubmit() {
    console.log(this.projectForm);
    this.formSubmitted = true;
    this.project.name = this.projectForm.value.project;
    this.project.email = this.projectForm.value.email;
    this.project.status = this.projectForm.value.status;
    this.projectForm.reset({
      project: '',
      email: '',
      status: 'Stable'
    });
  }

  forbiddenName(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'test') {
      return {isNameForbidden: true};
    }
    return null;
  }

  asyncForbiddenName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test') {
          resolve({isNameForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
