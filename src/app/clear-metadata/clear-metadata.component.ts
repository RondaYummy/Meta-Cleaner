import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as piexif from 'piexifjs';

@Component({
  selector: 'app-clear-metadata',
  templateUrl: './clear-metadata.component.html',
  styleUrls: ['./clear-metadata.component.scss'],
})
export class ClearMetadataComponent implements OnInit {
  @Input() photoList!: Array<string>;
  @Output() cancel = new EventEmitter<boolean>();

  securedString = 'Secured by Cyber Regiment! Glory To Ukraine!';
  zeroth: any = {};
  exif: any = {};
  gps: any = {};

  // ZEROTH
  replaceZerothStrings = [
    'Make',
    'Software',
    'DocumentName',
    'Artist',
    'ProcessingSoftware',
    'ImageDescription',
    'Model',
    'WhitePoint',
    'PrimaryChromaticities',
    'HostComputer',
    'InkNames',
    'TargetPrinter',
    'JPEGTables',
    'YCbCrCoefficients',
    'ReferenceBlackWhite',
    'ImageID',
    'BatteryLevel',
    'ExifTag',
    'InterColorProfile',
    'GPSTag',
    'Copyright',
    'ExposureTime',
    'FlashEnergy',
    'SpatialFrequencyResponse',
    'Noise',
    'FocalPlaneXResolution',
    'FocalPlaneYResolution',
    'SecurityClassification',
    'ImageHistory',
    'ExposureIndex',
    'PrintImageMatching',
    'UniqueCameraModel',
    'BlackLevel',
    'BlackLevelDeltaH',
    'BlackLevelDeltaV',
    'DefaultScale',
    'ColorMatrix1',
    'ColorMatrix2',
    'CameraCalibration1',
    'CameraCalibration2',
    'ReductionMatrix1',
    'ReductionMatrix2',
    'AnalogBalance',
    'AsShotWhiteXY',
    'BaselineExposure',
    'BaselineNoise',
    'BaselineSharpness',
    'BestQualityScale',
    'OriginalRawFileData',
    'AsShotICCProfile',
    'AsShotPreProfileMatrix',
    'CurrentICCProfile',
    'CurrentPreProfileMatrix',
    'LinearResponseLimit',
    'CameraSerialNumber',
    'LensInfo',
    'ChromaBlurRadius',
    'AntiAliasStrength',
    'ShadowScale',
    'RawImageDigest',
    'OriginalRawFileDigest',
    'ProfileHueSatMapData1',
    'ProfileHueSatMapData2',
    'NoiseReductionApplied',
    'ForwardMatrix1',
    'ForwardMatrix2',
    'ProfileLookTableData',
    'OpcodeList1',
    'OpcodeList2',
    'OpcodeList3',
  ];
  // EXIF
  replaceExifStrings = [
    'LensMake',
    'ExposureTime',
    'CameraOwnerName',
    'SceneType',
    'FNumber',
    'SpectralSensitivity',
    'OECF',
    'InteroperabilityTag',
    'ComponentsConfiguration',
    'CompressedBitsPerPixel',
    'ShutterSpeedValue',
    'ApertureValue',
    'BrightnessValue',
    'ExposureBiasValue',
    'MaxApertureValue',
    'SubjectDistance',
    'FocalLength',
    'MakerNote',
    'UserComment',
    'SubSecTime',
    'SubSecTimeOriginal',
    'SubSecTimeDigitized',
    'RelatedSoundFile',
    'FlashEnergy',
    'SpatialFrequencyResponse',
    'FocalPlaneXResolution',
    'FocalPlaneYResolution',
    'ExposureIndex',
    'FileSource',
    'CFAPattern',
    'BodySerialNumber',
    'LensModel',
  ];

  // GPS
  replaceGPSStrings = [
    'GPSLatitudeRef',
    'GPSLatitude',
    'GPSLongitudeRef',
    'GPSLongitude',
    'GPSAltitude',
    'GPSTimeStamp',
    'GPSSatellites',
    'GPSStatus',
    'GPSMeasureMode',
    'GPSDOP',
    'GPSSpeedRef',
    'GPSSpeed',
    'GPSTrackRef',
    'GPSTrack',
    'GPSImgDirectionRef',
    'GPSImgDirection',
    'GPSMapDatum',
    'GPSDestLatitudeRef',
    'GPSDestLatitude',
    'GPSDestLongitudeRef',
    'GPSDestLongitude',
    'GPSDestBearingRef',
    'GPSDestBearing',
    'GPSDestDistanceRef',
    'GPSDestDistance',
    'GPSProcessingMethod',
    'GPSAreaInformation',
    'GPSHPositioningError',
  ];
  // TODO @Inject(piexif)
  // Error: ERROR NullInjectorError: R3InjectorError(AppModule)[[object Object] -> [object Object] -> [object Object]]:
  // NullInjectorError: No provider for [object Object]!
  constructor(@Inject(piexif) private piexif: any) {}

  ngOnInit(): void {
    this.replaceZerothStrings.forEach((prop: string) => {
      this.zeroth[this.piexif.ImageIFD[prop]] = this.securedString;
    });

    this.replaceExifStrings.forEach((prop) => {
      this.exif[this.piexif.ExifIFD[prop]] = this.securedString;
    });

    this.replaceGPSStrings.forEach((prop) => {
      this.gps[this.piexif.GPSIFD[prop]] = this.securedString;
    });

    const exifObj = { '0th': this.zeroth, Exif: this.exif, GPS: this.gps };
    const exifbytes = piexif.dump(exifObj);
    const data = this.photoList[0].toString(); // TODO .toString('binary');???
    const newData = piexif.insert(exifbytes, data);
    const newJpeg = Buffer.from(newData, 'binary');
    console.log(newJpeg, 'newJpeg');
  }

  cancelClearMetadata() {
    console.log('Cancel...');
    this.cancel.emit(true);
  }
}
