import { useMutation, useQueryClient } from "react-query";
import { UseFatch } from "../fetchs";

const fetch = new UseFatch()

export function login() {
  const queryClient = useQueryClient();

  return useMutation(fetch.signIn, {
    onSuccess: () => {
      queryClient.invalidateQueries('signIn');
    },
  });
}

export function singUp() {
  const queryClient = useQueryClient();

  return useMutation(fetch.signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries('signUp');
    },
  });
}