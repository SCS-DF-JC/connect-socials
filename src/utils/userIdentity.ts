export function getUserId() {
  let id = localStorage.getItem("saas_user_id");
  if (!id) {
    id = "user_" + crypto.randomUUID();
    localStorage.setItem("saas_user_id", id);
  }
  return id;
}
