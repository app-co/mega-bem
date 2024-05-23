import { ErrorMessage, Field, FieldProps, Formik } from 'formik';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';

import { useRequestPasswordChangeMutation } from '@/hooks';
import { ForgotPasswordModalProps } from '@/interfaces';
import { CreateValidationSchemas } from '@/schemas';

export const ForgotPasswordModal = ({
  open,
  corPrimaria,
  onCancel,
}: ForgotPasswordModalProps) => {

  const { ForgotPasswordValidationSchema } = CreateValidationSchemas();

  const { mutateAsync: requestPasswordChange, isLoading } =
    useRequestPasswordChangeMutation();

  const handleSubmit = async (values: { email: string }) => {
    try {
      await requestPasswordChange(values.email);

      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Solicitação realizada com sucesso',
      });
    } catch (error) {
      console.error(error);

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível solicitar a recuperação de senha no momento.',
      });
    } finally {
      onCancel();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.centeredView}
    >
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent
          visible={open}
          onRequestClose={onCancel}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={onCancel}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  Insira
                </Text>

                <Text style={styles.modalSmallText}>
                  components.modals.forgotPasswordModal.modalSmallText
                </Text>

                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={ForgotPasswordValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleSubmit }) => (
                    <>
                      <Text style={styles.title}>
                        components.modals.forgotPasswordModal.email
                      </Text>
                      <Field name="email">
                        {({ field }: FieldProps<string>) => (
                          <TextInput
                            {...field}
                            placeholder={
                              'components.modals.forgotPasswordModal.emailPlaceholder'}
                            style={styles.input}
                            onChangeText={field.onChange('email')}
                            onBlur={field.onBlur('email')}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="email">
                        {errorMsg => (
                          <Text style={styles.errorText}>{errorMsg}</Text>
                        )}
                      </ErrorMessage>

                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            backgroundColor: corPrimaria,
                          },
                        ]}
                        disabled={isLoading}
                        onPress={() => handleSubmit()}
                      >
                        {isLoading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.buttonText}>
                            components.modals.forgotPasswordModal.button.send
                          </Text>
                        )}
                      </TouchableOpacity>
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    color: '#555',
    width: 250,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderColor: '#D9D9D9',
    height: 60,
    marginBottom: 12,
    width: 250,
    fontSize: 16,
    justifyContent: 'center',
  },
  button: {
    width: 250,
    borderRadius: 16,
    paddingVertical: 8,
    marginTop: 14,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#434343',
    marginBottom: 20,
  },
  modalSmallText: {
    color: '#9D9D9D',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordModal;
