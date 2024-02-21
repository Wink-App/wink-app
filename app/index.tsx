import { useRouter } from "expo-router";

import { useCallback, useEffect, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from "react-native";

import SafeAreaLayout from "../appLayouts/SafeAreaLayout";

import { ButtonText } from "../components/elements/Button";
import TransitionElement from "../components/transitions/TransitionElement";
import { HorizontalScroll } from "@/components/wrappers/Scroll";
import { TextBig } from "../utils/text/Text";
import { windowWidth } from "../utils/utils";

import { colorOrange, colorPurple, colorWhite, secondaryTextLight, stylesBase } from "../utils/styles";

type SlideProps = {
  id?: number;
  text: {
    firstLine: string;
    secondLine: string;
    body: string;
  };
};

export default function Index() {
  const {
    wrapper,
    container,
    scrollView,
    dots,
    dot,
    dotActive,
    dotInactive,
    actionContainer,
    action,
  } = styles;

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
    <View style={wrapper}>
      <SafeAreaLayout>
        <View style={container}>
          <View style={scrollView}>
            <HorizontalScroll
              pagingEnabled
              onScroll={handleScroll}>
              {slides.map((slide) => (
                <Slide key={slide.id} text={slide.text} />
              ))}
            </HorizontalScroll>
          </View>
          <View style={dots}>
            {slides.map((slide, index) => (
              <View
                key={slide.id}
                style={[
                  dot,
                  idCurrentSlide === index
                    ? dotActive
                    : dotInactive,
                ]}
              />
            ))}
          </View>
          <View style={actionContainer}>
            {hasReachedLastSlide && (
              <TransitionElement>
                <ButtonText
                  style={{ height: 50 }}
                  onPress={handleNavigateToRegister}>
                  <TextBig style={action}>Avanti</TextBig>
                </ButtonText>
              </TransitionElement>
            )}
          </View>
        </View>
      </SafeAreaLayout >
    </View >
  );
}

function Slide({ text }: SlideProps) {
  const {
    slide,
    title,
    body,
  } = styles;
  return (
    <View style={slide}>
      <Text style={title}>{text.firstLine}</Text>
      <Text style={title}>{text.secondLine}</Text>
      <Text style={body}>{text.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: colorPurple,
  },
  container: {
    height: "100%",
    ...stylesBase.flexColumnCenter,
  },
  scrollView: {
    height: 325,
  },
  slide: {
    width: windowWidth,
    ...stylesBase.flexColumnStartLeft,
    height: 300,
    paddingHorizontal: 30,
  },
  dots: {
    ...stylesBase.flexRowCenter,
    height: 10,
    gap: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: colorOrange,
  },
  dotInactive: {
    backgroundColor: colorWhite,
  },
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
  actionContainer: {
    ...stylesBase.flexRowCenter,
    height: 30,
    marginTop: 50,
  },
  action: {
    ...stylesBase.fontBogartMedium,
    color: secondaryTextLight,
    lineHeight: 24,
  },
});
