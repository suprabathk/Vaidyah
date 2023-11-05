import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export const isUserValid = pb.authStore.isValid;

export const signup = async (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}) => {
  return await pb.collection("users").create(data);
};

export const signin = async (data: { email: string; password: string }) => {
  return await pb
    .collection("users")
    .authWithPassword(data.email, data.password);
};

export const signout = () => {
  pb.authStore.clear();
};

export const setOpenAIKey = async (OpenAIKey: string) => {
  return await pb
    .collection("users")
    .update(pb.authStore.model?.id, { OpenAIKey });
};

export const getUser = () => {
  return pb.authStore.model;
};

export const addMessage = async (data: { message: string; reply: string }) => {
  return await pb.collection("message").create({
    message: data.message,
    reply: data.reply,
    user: pb.authStore.model?.id,
  });
};

export const getMessages = async () => {
  return await pb.collection("message").getFullList({
    sort: "created",
  });
};

export const getResource = async () => {
  return await pb.collection("resources").getOne("currentresource");
};

export const changeResource = async (data: {
  files: FileList;
  name: string;
}) => {
  const formData = new FormData();
  for (let file of data.files) {
    formData.append("file", file);
  }
  formData.append("name", data.name);
  return await pb.collection("resources").update("currentresource", formData);
};

export const getUsers = async () => {
  return await pb.collection("users").getFullList({
    sort: "-created",
  });
};

export const updateAdminStatus = async (userID: string, status: boolean) => {
  return await pb.collection("users").update(userID, {
    isAdmin: status,
  });
};
