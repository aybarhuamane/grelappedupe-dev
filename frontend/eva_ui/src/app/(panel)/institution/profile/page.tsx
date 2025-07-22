import { personGetId } from "@/api/app/core/fetchPerson";
import { functionsGetUserData, UserProfile } from "@/modules/core";
import { auth, person } from "@/types";

export default async function Page() {
  const { getUser } = functionsGetUserData;
  let personData: person.IPersonList | null = null;

  const userData: auth.IUserAuth = (await getUser()) as auth.IUserAuth;

  try {
    const person = await personGetId(userData.persona_id, true);
    if (person.ok) {
      const newData = await person.json();
      personData = newData;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      {personData && (
        <UserProfile defaultData={personData} cancelHref="/director" />
      )}
    </>
  );
}
