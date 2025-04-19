import { StyleSheet, Image, Platform, Dimensions } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');
export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner2.jpg')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Nosso Escritório</ThemedText>
      </ThemedView>
      <ThemedText>
        Soluções jurídicas com ética, transparência e excelência.
      </ThemedText>

      <Collapsible title="Áreas de Atuação">
        <ThemedText>
          Atuamos em diversas áreas do Direito, como:{' '}
          <ThemedText type="defaultSemiBold">civil, trabalhista, empresarial</ThemedText> e{' '}
          <ThemedText type="defaultSemiBold">família</ThemedText>.
        </ThemedText>
        <ThemedText>
          Clique nas abas para explorar cada uma delas em detalhes.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Atendimento Personalizado">
        <ThemedText>
          Nosso atendimento é feito com foco no cliente. Você pode agendar uma consulta online ou
          presencial diretamente pelo app.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Equipe Especializada">
        <ThemedText>
          Nosso time é formado por advogados experientes, preparados para oferecer a melhor
          orientação jurídica.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Documentos e Modelos">
        <ThemedText>
          Acesse documentos e modelos úteis para facilitar processos como abertura de empresa,
          acordos ou petições.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Ver exemplos</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Modo Claro e Escuro">
        <ThemedText>
          O aplicativo se adapta ao seu dispositivo, oferecendo uma experiência confortável em
          qualquer hora do dia.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Recursos Visuais e Interativos">
        <ThemedText>
          O cabeçalho com imagem institucional utiliza animação para destacar nossa identidade visual.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              O efeito parallax no topo traz uma navegação mais elegante e moderna.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    position: 'absolute',
    bottom: width > 450 ? -400 : -350, 
    left: width > 450 ? -150 : -1050,   
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

