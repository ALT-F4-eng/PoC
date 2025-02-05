import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { ListaComponent } from "./app/lista/lista.component";
import { FormComponent } from "./app/form/form.component";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

bootstrapApplication(ListaComponent, appConfig).catch((err) =>
  console.error(err)
);
