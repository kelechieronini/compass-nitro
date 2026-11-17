import CoreLocation
import Foundation
import NitroModules

final class HybridCompass: HybridCompassSpec, CLLocationManagerDelegate {
  private let manager = CLLocationManager()
  private var onReading: ((CompassReading) -> Void)?

  override init() {
    super.init()
    manager.delegate = self
    manager.headingFilter = 1
  }

  func startUpdates(onReading: @escaping (CompassReading) -> Void) throws {
    self.onReading = onReading
    guard CLLocationManager.headingAvailable() else { return }
    DispatchQueue.main.async { [weak self] in self?.manager.startUpdatingHeading() }
  }

  func stopUpdates() throws {
    onReading = nil
    DispatchQueue.main.async { [weak self] in self?.manager.stopUpdatingHeading() }
  }

  func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
    guard newHeading.magneticHeading >= 0 else { return }
    onReading?(CompassReading(heading: newHeading.magneticHeading, accuracy: newHeading.headingAccuracy))
  }
}
