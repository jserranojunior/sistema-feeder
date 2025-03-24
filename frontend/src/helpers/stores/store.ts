import { reactive } from "vue";
import { useAuth } from "../../mods/auth/composables/useAuth";
import { useRouter } from "vue-router";
import { useRegister } from "../../mods/register/composables/useRegister";
import { useUsers } from "../../mods/users/composables/useUsers";
import { useAcl } from "../../mods/acl/composables/useAcl";

export default function useStore() {
  let auth = reactive(useAuth());
  let router = reactive(useRouter());
  let register = reactive(useRegister());
  let users = reactive(useUsers());
  let acl = reactive(useAcl());

  return { register, auth, router, users, acl };
}
