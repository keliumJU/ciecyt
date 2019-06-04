/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CiecytTestModule } from '../../../test.module';
import { ModalidadDeGradoUpdateComponent } from 'app/entities/modalidad-de-grado/modalidad-de-grado-update.component';
import { ModalidadDeGradoService } from 'app/entities/modalidad-de-grado/modalidad-de-grado.service';
import { ModalidadDeGrado } from 'app/shared/model/modalidad-de-grado.model';

describe('Component Tests', () => {
  describe('ModalidadDeGrado Management Update Component', () => {
    let comp: ModalidadDeGradoUpdateComponent;
    let fixture: ComponentFixture<ModalidadDeGradoUpdateComponent>;
    let service: ModalidadDeGradoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CiecytTestModule],
        declarations: [ModalidadDeGradoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ModalidadDeGradoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModalidadDeGradoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModalidadDeGradoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ModalidadDeGrado(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ModalidadDeGrado();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
