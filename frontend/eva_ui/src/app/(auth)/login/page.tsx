import { LoginComponent } from "@/modules/core/components";

export default async function Page() {
  return (
    <div>
      <LoginComponent goTo="/dashboard" />
    </div>
  );
}
