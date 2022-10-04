import { Modal, ModalProps, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Question, Actions } from './styles';

import { Button } from '@components/Button';

type Props = ModalProps & {
	onClose: () => void;
}

export function ExclusionModal({ onClose, ...rest }: Props) {

	const navigation = useNavigation();

	function handleCancelExclusion() {
		onClose();
	}

	function handleConfirmExclusion() {
		navigation.navigate('home');
	}

	return (
		<Modal {...rest}>
			<Container>
				<Content>
					<Question>Deseja realmente excluir o registro da refeição?</Question>

					<Actions>
						<Button
							title='Cancelar'
							type='SECONDARY'
							style={{ flex: 1, marginRight: 10 }}
							onPress={handleCancelExclusion}
						/>
						<Button
							title='Sim, excluir'
							style={{ flex: 1 }}
							onPress={handleConfirmExclusion}
						/>
					</Actions>
				</Content>
			</Container>
		</Modal>
	);
}