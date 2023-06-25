import {
	AspectRatio,
	Button,
	FormControl,
	HStack,
	Image,
	Input,
	Modal,
	ScrollView,
	VStack,
} from 'native-base';
import { Fragment, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useBuktiDokumen } from '../api/bukti-dokumen';
import { ToastAndroid, Alert } from 'react-native';
import _, { isEmpty } from 'lodash';

const defaultPhotos = [
	{
		nama_dokumen: '',
		dokumen: '',
	},
];

export default function BuktiDokumen({ route }) {
	const { buktiDokumenId } = route.params;
	const { dataBuktiDokumen, uploadBuktiDokumen, deleteBuktiDokumen } =
		useBuktiDokumen(buktiDokumenId);

	const [isLoading, setIsLoading] = useState(false);
	const [photos, setPhotos] = useState(defaultPhotos);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	useEffect(() => {
		if (
			!isEmpty(dataBuktiDokumen) &&
			dataBuktiDokumen.foto_bukti_dokumen.length > 0
		) {
			setPhotos(dataBuktiDokumen.foto_bukti_dokumen);
		}
	}, [dataBuktiDokumen]);

	const pickImage = async (index) => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
			allowsMultipleSelection: false,
		});

		if (!result.canceled) {
			let data = [...photos];
			data[index]['dokumen'] = result.assets[0].uri;
			setPhotos(data);
		}
	};

	const handleFormChange = (text, index) => {
		let data = [...photos];
		data[index]['nama_dokumen'] = text;
		setPhotos(data);
	};

	const addPhotos = () => {
		let object = {
			nama_dokumen: '',
			dokumen: '',
		};

		setPhotos([...photos, object]);
	};

	const onSubmit = async () => {
    const hasEmptyField = photos.some(p => p.nama_dokumen === '' || p.dokumen === '');

    if (hasEmptyField) {
      ToastAndroid.show('Nama/gambar dokumen tidak boleh kosong!', ToastAndroid.SHORT);
      return;
    }

		try {
			setIsLoading(true);

			const formData = new FormData();

			photos.forEach((photo) => {
				formData.append('bukti_dokumen', {
					uri: photo.dokumen,
					name: photo.nama_dokumen,
					type: 'image/png',
				});
			});

			const response = await uploadBuktiDokumen({
				dokumen: formData,
			});

			if (response.success) {
				ToastAndroid.show('Berhasil menyimpan data!', ToastAndroid.SHORT);

        setPhotos(response.data.foto_bukti_dokumen);
			} else {
				throw new Error('Terjadi kesalahan ketika menyimpan data!');
			}
		} catch (err) {
			ToastAndroid.show(
				err.response?.data?.message || err.message || err,
				ToastAndroid.SHORT
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteImage = (index, dokumenId) => {
    let data = [...photos];
    const isHostedUrl = data[index]['dokumen'].includes('https');

    if (!isHostedUrl) {
      let data = [...photos];
      data[index]['dokumen'] = '';
      setPhotos(data);
      return;
    }

		Alert.alert(
			'Yakin menghapus dokumen ini?',
			'Aksi ini tidak dapat dibatalkan.',
			[
				{
					text: 'Batal',
					style: 'cancel',
				},
				{
					text: 'Ya, Hapus',
					onPress: async () => {
						try {
							const res = await deleteBuktiDokumen(dokumenId);

							if (res.success) {
								let data = [...photos];
								data[index]['dokumen'] = '';
								data[index]['nama_dokumen'] = '';
								setPhotos(data);

								ToastAndroid.show(
									'Berhasil menghapus dokumen!',
									ToastAndroid.SHORT
								);
							} else {
								throw new Error('Terjadi kesalahan saat menghapus data!');
							}
						} catch (err) {
							console.log(err);
							ToastAndroid.show(
								err.response?.data?.message || err.message || err,
								ToastAndroid.SHORT
							);
						}
					},
					style: 'destructive',
				},
			]
		);
	};

	const handlePreviewImage = (image) => {
		setShowModal(true);
		setSelectedImage(image);
	};

	return (
		<ScrollView m='16px'>
			<Button onPress={addPhotos} mb='20px'>
				Tambah Bukti Dokumen
			</Button>
			<VStack space='12px'>
				{photos.map((photo, index) => (
					<FormControl key={index}>
						<FormControl.Label>Nama Dokumen {index + 1}</FormControl.Label>
						<Input
							value={photo.nama_dokumen}
							onChangeText={(text) => handleFormChange(text, index)}
							mb='12px'
							name='nama_dokumen'
						/>
						{photo.dokumen ? (
							<Fragment>
								<AspectRatio ratio={4 / 3}>
									<Image
										alt={photo.dokumen}
										source={{ uri: photo.dokumen }}
										resizeMode='contain'
									/>
								</AspectRatio>
								<HStack space='8px' mt='8px' justifyContent='center'>
									<Button onPress={() => handlePreviewImage(photo.dokumen)}>
										Lihat
									</Button>
									<Button
										colorScheme='red'
										onPress={() => handleDeleteImage(index, photo._id)}
									>
										Hapus
									</Button>
								</HStack>
							</Fragment>
						) : (
							<Button onPress={() => pickImage(index)}>
								Unggah gambar bukti dokumen
							</Button>
						)}
					</FormControl>
				))}
				<Button onPress={onSubmit} isLoading={isLoading}>
					Simpan Data
				</Button>
			</VStack>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content>
					<Modal.CloseButton bg='gray.300' />
					<Modal.Header>Preview Gambar</Modal.Header>
					<Image
						source={{ uri: selectedImage }}
						resizeMode='contain'
						alt={selectedImage}
						style={{ width: '100%', height: '100%' }}
					/>
				</Modal.Content>
			</Modal>
		</ScrollView>
	);
}
