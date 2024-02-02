import { useRouter } from "expo-router";

import { useCallback, useEffect, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import SafeAreaLayout from "../appLayouts/SafeAreaLayout";

import { ButtonText } from "../components/elements/Button";
import TransitionElement from "../components/transitions/TransitionElement";
import { windowWidth } from "../utils/utils";

import { colorOrange, colorPurple, colorWhite, secondaryTextLight, stylesBase } from "../utils/styles";

type Slide = {
  id: number;
  JSX: JSX.Element;
};

export default function Index() {

  const {
    wrapper,
    container,
    scrollView,
    slideWidth,
    dots,
    dot,
    dotActive,
    dotInactive,
    actionContainer,
    action,
  } = styles;

  const router = useRouter();

  const slides: Slide[] = useMemo(() => [
    { id: 0, JSX: <SlideOne /> },
    { id: 1, JSX: <SlideTwo /> },
    { id: 2, JSX: <SlideThree /> },
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
    router.push("/auth/home");
  }, []);

  return (
    <View style={wrapper}>
      <SafeAreaLayout>
        <View style={container}>
          <View style={scrollView}>
            <FlatList
              data={slides}
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View key={item.id} style={slideWidth}>
                  {item.JSX}
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
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
                  text="Avanti"
                  styleText={action}
                  onPress={handleNavigateToRegister}
                />
              </TransitionElement>
            )}
          </View>
        </View>
      </SafeAreaLayout>
    </View>
  );
}

function SlideOne() {

  const {
    slide,
    title,
    body,
  } = styles;

  const bodyCopy =
    "L'app che ti darà la possibilità\ndi fare shopping online e\nricevere i tuoi ordini entro\n60 minuti ovunque tu voglia!";

  return (
    <View style={slide}>
      <Text style={title}>Benvenuto</Text>
      <Text style={title}>su Wink</Text>
      <Text style={body}>{bodyCopy}</Text>
    </View>
  );
}

function SlideTwo() {

  const {
    slide,
    title,
    body,
  } = styles;

  const bodyCopy =
    "Accedi o registrati, dopodiché\navrai a disposizione gli articoli\ndei negozi affiliati, in una\npiattaforma a portata di mano!";

  return (
    <View style={slide}>
      <Text style={title}>Acquista con</Text>
      <Text style={title}>semplicità</Text>
      <Text style={body}>{bodyCopy}</Text>
    </View>
  );
}

function SlideThree() {

  const {
    slide,
    title,
    body,
  } = styles;

  const bodyCopy =
    "Una volta aver effettuato l'acquisto,\nriceverai il tuo ordine entro\n60 minuti e avrai acquistato\ncomodamente da casa o ufficio!";

  return (
    <View style={slide}>
      <Text style={title}>Non è mai stato</Text>
      <Text style={title}>così veloce</Text>
      <Text style={body}>{bodyCopy}</Text>
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
  slideWidth: {
    width: windowWidth,
  },
  slide: {
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
    fontSize: 16,
    lineHeight: 24,
  },
});
