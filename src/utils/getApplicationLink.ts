type ApplicationType = "checkout" | "cart" | "my-account" | "identity";

type ApplicationTypeProps<T extends ApplicationType = ApplicationType> =
  T extends "my-account"
    ? {
        applicationType: T;
        orderId?: string;
        modeType?: "login" | "signup";
        clientId?: string;
        scope?: string;
        returnUrl?: string;
        resetPasswordUrl?: string;
      }
    : T extends "identity"
      ? {
          applicationType: T;
          orderId?: string;
          modeType: "login" | "signup";
          clientId: string;
          scope: string;
          returnUrl: string;
          resetPasswordUrl?: string;
        }
      : {
          applicationType: Omit<T, "my-account" | "identity">;
          orderId: string;
          modeType?: "login" | "signup";
          clientId?: string;
          scope?: string;
          returnUrl?: string;
          resetPasswordUrl?: string;
        };

interface TArgs {
  accessToken: string;
  customDomain?: string;
}

type Props = ApplicationTypeProps & TArgs;

const endpoint = `https://${process.env.NEXT_PUBLIC_CL_SLUG}.commercelayer.io`;

export function getDomain(endpoint: string): { slug: string; domain: string } {
  const url = new URL(endpoint);
  const [slug] = url.hostname.split(".");
  const domain = url.hostname.replace(`${slug ?? ""}.`, "");
  return {
    domain,
    slug: slug ?? "",
  };
}

export function getApplicationLink({
  orderId,
  accessToken,
  applicationType,
  modeType,
  clientId,
  scope,
  returnUrl,
  resetPasswordUrl,
  customDomain,
}: Props): string {
  const { domain, slug } = getDomain(endpoint);
  const env = domain === "commercelayer.io" ? "" : "stg.";
  const t =
    applicationType === "identity"
      ? modeType === "login"
        ? ""
        : "signup"
      : "";
  const c = clientId ? `&clientId=${clientId}` : "";
  const s = scope ? `&scope=${scope}` : "";
  const r = returnUrl ? `&returnUrl=${returnUrl}` : "";
  const p = resetPasswordUrl ? `&resetPasswordUrl=${resetPasswordUrl}` : "";
  const params = applicationType === "identity" ? `${c}${s}${r}${p}` : "";
  const domainName = customDomain ?? `${slug}.${env}commercelayer.app`;
  const application = customDomain ? "" : `/${applicationType.toString()}`;
  return `https://${domainName}${application}/${
    orderId ?? t ?? ""
  }?accessToken=${accessToken}${params}`;
}
