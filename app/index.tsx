import { useRouter } from "expo-router";

import { useCallback, useEffect, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text } from "react-native";

import SafeAreaLayout from "../appLayouts/SafeAreaLayout";
import AppView from "@/appLayouts/AppView";

import { ButtonText } from "../components/elements/Button";
import TransitionElement from "../components/transitions/TransitionElement";
import { HorizontalScroll } from "@/components/wrappers/Scroll";
import { TextBig } from "../utils/text/Text";
import { windowWidth } from "../utils/utils";

import { colorOrange, colorWhite, secondaryTextLight, stylesBase } from "../utils/styles";

type SlideProps = {
  id?: number;
  text: {
    firstLine: string;
    secondLine: string;
    body: string;
  };
};

export default function Index() {
  const { action } = styles;

  const router = useRouter();

  const slides: SlideProps[] = useMemo(() => [
    {
      id: 0,
      text: {
        firstLine: "Benvenuto",
        secondLine: "su Wink",
        body: "L'app che ti darà la possibilità\ndi fare shopping online e\nricevere i tuoi ordini entro\n60 minuti ovunque tu voglia!"
      }
    },
    {
      id: 1,
      text: {
        firstLine: "Acquista con",
        secondLine: "semplicità",
        body: "Accedi o registrati, dopodiché\navrai a disposizione gli articoli\ndei negozi affiliati, in una\npiattaforma a portata di mano!"
      }
    },
    {
      id: 2,
      text: {
        firstLine: "Non è mai stato",
        secondLine: "così veloce",
        body: "Una volta aver effettuato l'acquisto,\nriceverai il tuo ordine entro\n60 minuti e avrai acquistato\ncomodamente da casa o ufficio!"
      }
    },
  ], []);

  const [idCurrentSlide, setIdCurrentSlide] = useState<number>(slides[0].id);
  const [hasReachedLastSlide, setHasReachedLastSlide] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let slide = Math.ceil(event.nativeEvent.contentOffset.x / windowWidth);
      slide = Math.max(0, Math.min(slide, slides.length - 1));
      if (slide !== idCurrentSlide) {
        setIdCurrentSlide(slide);
      }
    },
    [idCurrentSlide],
  );

  useEffect(() => {
    if (idCurrentSlide === slides.length - 1) {
      setHasReachedLastSlide(true);
    }
  }, [idCurrentSlide]);

  const handleNavigateToRegister = useCallback(() => {
    router.push("/auth/");
  }, []);

  return (
    <AppView
      height100
      backgroundColorPurple>
      <SafeAreaLayout>
        <AppView height100 flexColumnCenter>
          <AppView height={325}>
            <HorizontalScroll
              pagingEnabled
              onScroll={handleScroll}>
              {slides.map((slide) => (
                <Slide key={slide.id} text={slide.text} />
              ))}
            </HorizontalScroll>
          </AppView>
          <AppView flexRowCenter height={10} gap={20}>
            {slides.map((slide, index) => (
              <AppView
                key={slide.id}
                width={10}
                height={10}
                borderRadius={5}
                backgroundColor={
                  idCurrentSlide === index
                    ? colorOrange
                    : colorWhite
                }
              />
            ))}
          </AppView>
          <AppView flexRowCenter height={30} marginTop={50}>
            {hasReachedLastSlide && (
              <TransitionElement>
                <ButtonText
                  style={{ height: 50 }}
                  onPress={handleNavigateToRegister}>
                  <TextBig style={action}>Avanti</TextBig>
                </ButtonText>
              </TransitionElement>
            )}
          </AppView>
        </AppView>
      </SafeAreaLayout >
    </AppView>
  );
}

function Slide({ text }: SlideProps) {
  const {
    title,
    body,
  } = styles;
  return (
    <AppView windowWidth flexColumnStartLeft height={300} paddingHorizontal={30}>
      <Text style={title}>{text.firstLine}</Text>
      <Text style={title}>{text.secondLine}</Text>
      <Text style={body}>{text.body}</Text>
    </AppView>
  );
}

const styles = StyleSheet.create({
  title: {
    ...stylesBase.fontBogartBold,
    color: colorOrange,
    fontSize: 38,
    lineHeight: 50,
  },
  body: {
    ...stylesBase.fontBogartMedium,
    color: colorWhite,
    fontSize: 20,
    lineHeight: 30,
    marginTop: 20,
  },
  action: {
    ...stylesBase.fontBogartMedium,
    color: secondaryTextLight,
    lineHeight: 24,
  },
});
