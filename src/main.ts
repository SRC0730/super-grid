import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { SuperGridWidgetComponent } from '@components';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

(async () => {
  const app = await createApplication();
  const superGridWidgetElement = createCustomElement(SuperGridWidgetComponent, {
    injector: app.injector,
  });
  customElements.define('super-grid', superGridWidgetElement);

  console.log('Super Grid Web Component registered successfully!');
})();
