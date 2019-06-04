/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CiecytTestModule } from '../../../test.module';
import { PreguntasDeleteDialogComponent } from 'app/entities/preguntas/preguntas-delete-dialog.component';
import { PreguntasService } from 'app/entities/preguntas/preguntas.service';

describe('Component Tests', () => {
  describe('Preguntas Management Delete Component', () => {
    let comp: PreguntasDeleteDialogComponent;
    let fixture: ComponentFixture<PreguntasDeleteDialogComponent>;
    let service: PreguntasService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CiecytTestModule],
        declarations: [PreguntasDeleteDialogComponent]
      })
        .overrideTemplate(PreguntasDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PreguntasDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PreguntasService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
