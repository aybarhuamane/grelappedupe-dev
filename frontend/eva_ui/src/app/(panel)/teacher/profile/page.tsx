import { personGetId } from "@/api/app/core/fetchPerson";
import { fetcher } from "@/lib/fetcher";
import { functionsGetUserData, UserProfile } from "@/modules/core";
import { auth, person } from "@/types";

export default async function Page() {
  const { getUser } = functionsGetUserData;
  const userData: auth.IUserAuth = (await getUser()) as auth.IUserAuth;

  const personData =
    (await fetcher<person.IPersonList>(
      () => personGetId(userData.persona_id, true),
      {
        timeoutMs: 10000,
        retries: 3,
        retryDelayMs: 1000,
      }
    )) ?? null;

  return (
    <>
      {personData && (
        <UserProfile defaultData={personData} cancelHref="/teacher" />
      )}
    </>
  );
}
