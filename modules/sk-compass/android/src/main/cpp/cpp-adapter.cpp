#include <jni.h>
#include <fbjni/fbjni.h>
#include "NitroSkCompassOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return facebook::jni::initialize(vm, []() {
    margelo::nitro::skcompass::registerAllNatives();
  });
}
