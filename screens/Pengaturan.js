import { Box, HStack, Heading, Image, Text, VStack, View } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from '../hooks/useAuth';

export default function Pengaturan({ navigation }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Keluar dari aplikasi?', 'Anda akan melakukan login kembali.', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya, Keluar',
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View display="flex" justifyContent="center" h="100%">
      <Box safeArea p="16px">
        <Image
          source={require('../assets/company-logo.png')}
          w={100}
          height={70}
          alt="Logo perusahaan"
        />
        <Heading fontSize="20px" fontWeight="medium">
          Aplikasi pelaporan hasil survei PT. SMART Multi Finance cabang Bekasi
        </Heading>
        <VStack space="12px" mt="16px" display="flex">
          <TouchableOpacity
            onPress={() => navigation.navigate('Ubah Informasi Akun')}>
            <HStack
              space="4px"
              borderBottomWidth="0.5px"
              borderBottomColor="warmGray.400"
              py="12px">
              <Icon name="person" size={18} />
              <Text>Ubah Profile</Text>
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <HStack
              space="4px"
              borderBottomWidth="0.5px"
              borderBottomColor="warmGray.400"
              py="12px">
              <Icon name="alert-circle" size={18} color="red" />
              <Text color="red.400">Keluar</Text>
            </HStack>
          </TouchableOpacity>
        </VStack>
      </Box>
    </View>
  );
}