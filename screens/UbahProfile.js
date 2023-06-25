import { FormControl, View, Input, Button, VStack } from 'native-base';
import useAuth from '../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import { ToastAndroid } from 'react-native';
import { updateProfile } from '../api/auth';

export default function UbahProfile() {
  const { auth, setAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      email: auth.email,
      name: auth.name,
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const validateConfirmPassword = (value) => {
    if (password && !value) {
      return 'Konfirmasi kata sandi dibutuhkan';
    }
    if (password !== value) {
      return 'Konfirmasi kata sandi tidak sama';
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await updateProfile(auth.userId, data)

      if (res.data.success) {
        ToastAndroid.show(
          res.data.message,
          ToastAndroid.SHORT
        );

        setAuth({
          ...auth,
          email: data.email,
          name: data.name,
        })
      }
    } catch (err) {
      ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
    }
  };

  return (
    <View px="16px" mt="16px">
      <VStack space="12px">
        <FormControl>
          <FormControl.Label>Nama</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                placeholder="John Doe"
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="name"
            defaultValue=""
            shouldUnregister={true}
            rules={{
              required: 'Nama tidak boleh kosong!',
            }}
          />
        </FormControl>
        <FormControl isRequired isInvalid={'email' in errors}>
          <FormControl.Label>Email</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                placeholder="johndoe@gmail.com"
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="email"
            rules={{
              required: 'Email tidak boleh kosong!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Format email salah!',
              },
            }}
            defaultValue=""
            shouldUnregister={true}
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={'password' in errors}>
          <FormControl.Label>Kata Sandi Baru</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                placeholder="••••••••"
                onChangeText={val => onChange(val)}
                value={value}
                type="password"
              />
            )}
            name="password"
            defaultValue=""
            shouldUnregister={true}
          />
          {password === '' && (
            <FormControl.HelperText>
              Kosongkan bila tidak ingin mengubah kata sandi.
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl
          isRequired={password !== ''}
          isDisabled={password === ''}
          pointerEvents={password === '' ? 'none' : 'auto'}
          isInvalid={'confirmPassword' in errors}>
          <FormControl.Label>Konfirmasi Kata Sandi Baru</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                placeholder="••••••••"
                onChangeText={val => onChange(val)}
                value={value}
                type="password"
              />
            )}
            name="confirmPassword"
            defaultValue=""
            rules={{
              validate: validateConfirmPassword,
            }}
            shouldUnregister={true}
          />
          {password === '' ? (
            <FormControl.HelperText>
              Kosongkan bila tidak ingin mengubah kata sandi.
            </FormControl.HelperText>
          ) : (
            <FormControl.ErrorMessage>
              {errors.confirmPassword?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isDisabled pointerEvents="none">
          <FormControl.Label>Role</FormControl.Label>
          <Input value={auth.role} textTransform="capitalize" />
        </FormControl>
        <Button mt="2" bgColor="primary.400" onPress={handleSubmit(onSubmit)}>
          Simpan Perubahan
        </Button>
      </VStack>
    </View>
  );
}