/*
 * Copyright (C) 2013 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example.android.bluetoothlegatt;

import android.util.Log;

import java.util.HashMap;

/**
 * This class includes a small subset of standard GATT attributes for demonstration purposes.
 */
public class SampleGattAttributes {
    private static HashMap<String, String> attributes = new HashMap();
    public static String HEART_RATE_MEASUREMENT = "00002a37-0000-1000-8000-00805f9b34fb";
    public static String CLIENT_CHARACTERISTIC_CONFIG = "00002902-0000-1000-8000-00805f9b34fb";
    public static String SOFTWARE_REVISION_STRING = "00002A28-0000-1000-8000-00805f9b34fb";

    static {
        // Sample Services.
        attributes.put("0000180d-0000-1000-8000-00805f9b34fb".toLowerCase(), "Heart Rate Service");
        attributes.put("0000180a-0000-1000-8000-00805f9b34fb".toLowerCase(), "Device Information Service");

        attributes.put("00002A7E-0000-1000-8000-00805f9b34fb".toLowerCase(), "Aerobic Heart Rate Lower Limit");
        attributes.put("00002A84-0000-1000-8000-00805f9b34fb".toLowerCase(), "Aerobic Heart Rate Upper Limit");
        attributes.put("00002A7F-0000-1000-8000-00805f9b34fb".toLowerCase(), "Aerobic Threshold");
        attributes.put("00002A80-0000-1000-8000-00805f9b34fb".toLowerCase(), "Age");
        attributes.put("00002A5A-0000-1000-8000-00805f9b34fb".toLowerCase(), "Aggregate");
        attributes.put("00002A43-0000-1000-8000-00805f9b34fb".toLowerCase(), "Alert Category ID");
        attributes.put("00002A42-0000-1000-8000-00805f9b34fb".toLowerCase(), "Alert Category ID Bit Mask");
        attributes.put("00002A06-0000-1000-8000-00805f9b34fb".toLowerCase(), "Alert Level");
        attributes.put("00002A44-0000-1000-8000-00805f9b34fb".toLowerCase(), "Alert Notification Control Point");
        attributes.put("00002A3F-0000-1000-8000-00805f9b34fb".toLowerCase(), "Alert Status");
        attributes.put("00002AB3-0000-1000-8000-00805f9b34fb".toLowerCase(), "Altitude");
        attributes.put("00002A81-0000-1000-8000-00805f9b34fb".toLowerCase(), "Anaerobic Heart Rate Lower Limit");
        attributes.put("00002A82-0000-1000-8000-00805f9b34fb".toLowerCase(), "Anaerobic Heart Rate Upper Limit");
        attributes.put("00002A83-0000-1000-8000-00805f9b34fb".toLowerCase(), "Anaerobic Threshold");
        attributes.put("00002A58-0000-1000-8000-00805f9b34fb".toLowerCase(), "Analog");
        attributes.put("00002A73-0000-1000-8000-00805f9b34fb".toLowerCase(), "Apparent Wind Direction ");
        attributes.put("00002A72-0000-1000-8000-00805f9b34fb".toLowerCase(), "Apparent Wind Speed");
        attributes.put("00002A01-0000-1000-8000-00805f9b34fb".toLowerCase(), "Appearance");
        attributes.put("00002AA3-0000-1000-8000-00805f9b34fb".toLowerCase(), "Barometric Pressure Trend");
        attributes.put("00002A19-0000-1000-8000-00805f9b34fb".toLowerCase(), "Battery Level");
        attributes.put("00002A49-0000-1000-8000-00805f9b34fb".toLowerCase(), "Blood Pressure Feature");
        attributes.put("00002A35-0000-1000-8000-00805f9b34fb".toLowerCase(), "Blood Pressure Measurement");
        attributes.put("00002A9B-0000-1000-8000-00805f9b34fb".toLowerCase(), "Body Composition Feature");
        attributes.put("00002A9C-0000-1000-8000-00805f9b34fb".toLowerCase(), "Body Composition Measurement");
        attributes.put("00002A38-0000-1000-8000-00805f9b34fb".toLowerCase(), "Body Sensor Location");
        attributes.put("00002AA4-0000-1000-8000-00805f9b34fb".toLowerCase(), "Bond Management Control Point");
        attributes.put("00002AA5-0000-1000-8000-00805f9b34fb".toLowerCase(), "Bond Management Feature");
        attributes.put("00002A22-0000-1000-8000-00805f9b34fb".toLowerCase(), "Boot Keyboard Input Report");
        attributes.put("00002A32-0000-1000-8000-00805f9b34fb".toLowerCase(), "Boot Keyboard Output Report");
        attributes.put("00002A33-0000-1000-8000-00805f9b34fb".toLowerCase(), "Boot Mouse Input Report");
        attributes.put("00002AA6-0000-1000-8000-00805f9b34fb".toLowerCase(), "Central Address Resolution");
        attributes.put("00002AA8-0000-1000-8000-00805f9b34fb".toLowerCase(), "CGM Feature");
        attributes.put("00002AA7-0000-1000-8000-00805f9b34fb".toLowerCase(), "CGM Measurement");
        attributes.put("00002AAB-0000-1000-8000-00805f9b34fb".toLowerCase(), "CGM Session Run Time");
        attributes.put("00002AAA-0000-1000-8000-00805f9b34fb".toLowerCase(), "CGM Session Start Time");
        attributes.put("00002AAC-0000-1000-8000-00805f9b34fb".toLowerCase(), "CGM Specific Ops Control Point");
        attributes.put("00002AA9-0000-1000-8000-00805f9b34fb".toLowerCase(), "CGM Status");
        attributes.put("00002A5C-0000-1000-8000-00805f9b34fb".toLowerCase(), "CSC Feature");
        attributes.put("00002A5B-0000-1000-8000-00805f9b34fb".toLowerCase(), "CSC Measurement");
        attributes.put("00002A2B-0000-1000-8000-00805f9b34fb".toLowerCase(), "Current Time");
        attributes.put("00002A66-0000-1000-8000-00805f9b34fb".toLowerCase(), "Cycling Power Control Point");
        attributes.put("00002A65-0000-1000-8000-00805f9b34fb".toLowerCase(), "Cycling Power Feature");
        attributes.put("00002A63-0000-1000-8000-00805f9b34fb".toLowerCase(), "Cycling Power Measurement");
        attributes.put("00002A64-0000-1000-8000-00805f9b34fb".toLowerCase(), "Cycling Power Vector");
        attributes.put("00002A99-0000-1000-8000-00805f9b34fb".toLowerCase(), "Database Change Increment");
        attributes.put("00002A85-0000-1000-8000-00805f9b34fb".toLowerCase(), "Date of Birth");
        attributes.put("00002A86-0000-1000-8000-00805f9b34fb".toLowerCase(), "Date of Threshold Assessment");
        attributes.put("00002A08-0000-1000-8000-00805f9b34fb".toLowerCase(), "Date Time");
        attributes.put("00002A0A-0000-1000-8000-00805f9b34fb".toLowerCase(), "Day Date Time");
        attributes.put("00002A09-0000-1000-8000-00805f9b34fb".toLowerCase(), "Day of Week");
        attributes.put("00002A7D-0000-1000-8000-00805f9b34fb".toLowerCase(), "Descriptor Value Changed");
        attributes.put("00002A00-0000-1000-8000-00805f9b34fb".toLowerCase(), "Device Name");
        attributes.put("00002A7B-0000-1000-8000-00805f9b34fb".toLowerCase(), "Dew Point");
        attributes.put("00002A56-0000-1000-8000-00805f9b34fb".toLowerCase(), "Digital");
        attributes.put("00002A0D-0000-1000-8000-00805f9b34fb".toLowerCase(), "DST Offset");
        attributes.put("00002A6C-0000-1000-8000-00805f9b34fb".toLowerCase(), "Elevation");
        attributes.put("00002A87-0000-1000-8000-00805f9b34fb".toLowerCase(), "Email Address");
        attributes.put("00002A0C-0000-1000-8000-00805f9b34fb".toLowerCase(), "Exact Time 256");
        attributes.put("00002A88-0000-1000-8000-00805f9b34fb".toLowerCase(), "Fat Burn Heart Rate Lower Limit");
        attributes.put("00002A89-0000-1000-8000-00805f9b34fb".toLowerCase(), "Fat Burn Heart Rate Upper Limit");
        attributes.put("00002A26-0000-1000-8000-00805f9b34fb".toLowerCase(), "Firmware Revision String");
        attributes.put("00002A8A-0000-1000-8000-00805f9b34fb".toLowerCase(), "First Name");
        attributes.put("00002A8B-0000-1000-8000-00805f9b34fb".toLowerCase(), "Five Zone Heart Rate Limits");
        attributes.put("00002AB2-0000-1000-8000-00805f9b34fb".toLowerCase(), "Floor Number");
        attributes.put("00002A8C-0000-1000-8000-00805f9b34fb".toLowerCase(), "Gender");
        attributes.put("00002A51-0000-1000-8000-00805f9b34fb".toLowerCase(), "Glucose Feature");
        attributes.put("00002A18-0000-1000-8000-00805f9b34fb".toLowerCase(), "Glucose Measurement");
        attributes.put("00002A34-0000-1000-8000-00805f9b34fb".toLowerCase(), "Glucose Measurement Context");
        attributes.put("00002A74-0000-1000-8000-00805f9b34fb".toLowerCase(), "Gust Factor");
        attributes.put("00002A27-0000-1000-8000-00805f9b34fb".toLowerCase(), "Hardware Revision String");
        attributes.put("00002A39-0000-1000-8000-00805f9b34fb".toLowerCase(), "Heart Rate Control Point");
        attributes.put("00002A8D-0000-1000-8000-00805f9b34fb".toLowerCase(), "Heart Rate Max");
        attributes.put("00002A37-0000-1000-8000-00805f9b34fb".toLowerCase(), "Heart Rate Measurement");
        attributes.put("00002A7A-0000-1000-8000-00805f9b34fb".toLowerCase(), "Heat Index");
        attributes.put("00002A8E-0000-1000-8000-00805f9b34fb".toLowerCase(), "Height");
        attributes.put("00002A4C-0000-1000-8000-00805f9b34fb".toLowerCase(), "HID Control Point");
        attributes.put("00002A4A-0000-1000-8000-00805f9b34fb".toLowerCase(), "HID Information");
        attributes.put("00002A8F-0000-1000-8000-00805f9b34fb".toLowerCase(), "Hip Circumference");
        attributes.put("00002A6F-0000-1000-8000-00805f9b34fb".toLowerCase(), "Humidity");
        attributes.put("00002A2A-0000-1000-8000-00805f9b34fb".toLowerCase(), "IEEE 11073-20601 Regulatory Certification Data List");
        attributes.put("00002AAD-0000-1000-8000-00805f9b34fb".toLowerCase(), "Indoor Positioning Configuration");
        attributes.put("00002A36-0000-1000-8000-00805f9b34fb".toLowerCase(), "Intermediate Cuff Pressure");
        attributes.put("00002A1E-0000-1000-8000-00805f9b34fb".toLowerCase(), "Intermediate Temperature");
        attributes.put("00002A77-0000-1000-8000-00805f9b34fb".toLowerCase(), "Irradiance");
        attributes.put("00002AA2-0000-1000-8000-00805f9b34fb".toLowerCase(), "Language");
        attributes.put("00002A90-0000-1000-8000-00805f9b34fb".toLowerCase(), "Last Name");
        attributes.put("00002AAE-0000-1000-8000-00805f9b34fb".toLowerCase(), "Latitude");
        attributes.put("00002A6B-0000-1000-8000-00805f9b34fb".toLowerCase(), "LN Control Point");
        attributes.put("00002A6A-0000-1000-8000-00805f9b34fb".toLowerCase(), "LN Feature");
        attributes.put("00002AB1-0000-1000-8000-00805f9b34fb".toLowerCase(), "Local East Coordinate");
        attributes.put("00002AB0-0000-1000-8000-00805f9b34fb".toLowerCase(), "Local North Coordinate");
        attributes.put("00002A0F-0000-1000-8000-00805f9b34fb".toLowerCase(), "Local Time Information");
        attributes.put("00002A67-0000-1000-8000-00805f9b34fb".toLowerCase(), "Location and Speed");
        attributes.put("00002AB5-0000-1000-8000-00805f9b34fb".toLowerCase(), "Location Name");
        attributes.put("00002AAF-0000-1000-8000-00805f9b34fb".toLowerCase(), "Longitude");
        attributes.put("00002A2C-0000-1000-8000-00805f9b34fb".toLowerCase(), "Magnetic Declination");
        attributes.put("00002AA0-0000-1000-8000-00805f9b34fb".toLowerCase(), "Magnetic Flux Density - 2D");
        attributes.put("00002AA1-0000-1000-8000-00805f9b34fb".toLowerCase(), "Magnetic Flux Density - 3D");
        attributes.put("00002A29-0000-1000-8000-00805f9b34fb".toLowerCase(), "Manufacturer Name String");
        attributes.put("00002A91-0000-1000-8000-00805f9b34fb".toLowerCase(), "Maximum Recommended Heart Rate");
        attributes.put("00002A21-0000-1000-8000-00805f9b34fb".toLowerCase(), "Measurement Interval");
        attributes.put("00002A24-0000-1000-8000-00805f9b34fb".toLowerCase(), "Model Number String");
        attributes.put("00002A68-0000-1000-8000-00805f9b34fb".toLowerCase(), "Navigation");
        attributes.put("00002A46-0000-1000-8000-00805f9b34fb".toLowerCase(), "New Alert");
        attributes.put("00002A04-0000-1000-8000-00805f9b34fb".toLowerCase(), "Peripheral Preferred Connection Parameters");
        attributes.put("00002A02-0000-1000-8000-00805f9b34fb".toLowerCase(), "Peripheral Privacy Flag");
        attributes.put("00002A5F-0000-1000-8000-00805f9b34fb".toLowerCase(), "PLX Continuous Measurement");
        attributes.put("00002A60-0000-1000-8000-00805f9b34fb".toLowerCase(), "PLX Features");
        attributes.put("00002A5E-0000-1000-8000-00805f9b34fb".toLowerCase(), "PLX Spot-Check Measurement");
        attributes.put("00002A50-0000-1000-8000-00805f9b34fb".toLowerCase(), "PnP ID");
        attributes.put("00002A75-0000-1000-8000-00805f9b34fb".toLowerCase(), "Pollen Concentration");
        attributes.put("00002A69-0000-1000-8000-00805f9b34fb".toLowerCase(), "Position Quality");
        attributes.put("00002A6D-0000-1000-8000-00805f9b34fb".toLowerCase(), "Pressure");
        attributes.put("00002A4E-0000-1000-8000-00805f9b34fb".toLowerCase(), "Protocol Mode");
        attributes.put("00002A78-0000-1000-8000-00805f9b34fb".toLowerCase(), "Rainfall");
        attributes.put("00002A03-0000-1000-8000-00805f9b34fb".toLowerCase(), "Reconnection Address");
        attributes.put("00002A52-0000-1000-8000-00805f9b34fb".toLowerCase(), "Record Access Control Point");
        attributes.put("00002A14-0000-1000-8000-00805f9b34fb".toLowerCase(), "Reference Time Information");
        attributes.put("00002A4D-0000-1000-8000-00805f9b34fb".toLowerCase(), "Report");
        attributes.put("00002A4B-0000-1000-8000-00805f9b34fb".toLowerCase(), "Report Map");
        attributes.put("00002A92-0000-1000-8000-00805f9b34fb".toLowerCase(), "Resting Heart Rate");
        attributes.put("00002A40-0000-1000-8000-00805f9b34fb".toLowerCase(), "Ringer Control Point");
        attributes.put("00002A41-0000-1000-8000-00805f9b34fb".toLowerCase(), "Ringer Setting");
        attributes.put("00002A54-0000-1000-8000-00805f9b34fb".toLowerCase(), "RSC Feature");
        attributes.put("00002A53-0000-1000-8000-00805f9b34fb".toLowerCase(), "RSC Measurement");
        attributes.put("00002A55-0000-1000-8000-00805f9b34fb".toLowerCase(), "SC Control Point");
        attributes.put("00002A4F-0000-1000-8000-00805f9b34fb".toLowerCase(), "Scan Interval Window");
        attributes.put("00002A31-0000-1000-8000-00805f9b34fb".toLowerCase(), "Scan Refresh");
        attributes.put("00002A5D-0000-1000-8000-00805f9b34fb".toLowerCase(), "Sensor Location");
        attributes.put("00002A25-0000-1000-8000-00805f9b34fb".toLowerCase(), "Serial Number String");
        attributes.put("00002A05-0000-1000-8000-00805f9b34fb".toLowerCase(), "Service Changed");
        attributes.put("00002A28-0000-1000-8000-00805f9b34fb".toLowerCase(), "Software Revision String");
        attributes.put("00002A93-0000-1000-8000-00805f9b34fb".toLowerCase(), "Sport Type for Aerobic and Anaerobic Thresholds");
        attributes.put("00002A47-0000-1000-8000-00805f9b34fb".toLowerCase(), "Supported New Alert Category");
        attributes.put("00002A48-0000-1000-8000-00805f9b34fb".toLowerCase(), "Supported Unread Alert Category");
        attributes.put("00002A23-0000-1000-8000-00805f9b34fb".toLowerCase(), "System ID");
        attributes.put("00002A6E-0000-1000-8000-00805f9b34fb".toLowerCase(), "Temperature");
        attributes.put("00002A1C-0000-1000-8000-00805f9b34fb".toLowerCase(), "Temperature Measurement");
        attributes.put("00002A1D-0000-1000-8000-00805f9b34fb".toLowerCase(), "Temperature Type");
        attributes.put("00002A94-0000-1000-8000-00805f9b34fb".toLowerCase(), "Three Zone Heart Rate Limits");
        attributes.put("00002A12-0000-1000-8000-00805f9b34fb".toLowerCase(), "Time Accuracy");
        attributes.put("00002A13-0000-1000-8000-00805f9b34fb".toLowerCase(), "Time Source");
        attributes.put("00002A16-0000-1000-8000-00805f9b34fb".toLowerCase(), "Time Update Control Point");
        attributes.put("00002A17-0000-1000-8000-00805f9b34fb".toLowerCase(), "Time Update State");
        attributes.put("00002A11-0000-1000-8000-00805f9b34fb".toLowerCase(), "Time with DST");
        attributes.put("00002A0E-0000-1000-8000-00805f9b34fb".toLowerCase(), "Time Zone");
        attributes.put("00002A71-0000-1000-8000-00805f9b34fb".toLowerCase(), "True Wind Direction");
        attributes.put("00002A70-0000-1000-8000-00805f9b34fb".toLowerCase(), "True Wind Speed");
        attributes.put("00002A95-0000-1000-8000-00805f9b34fb".toLowerCase(), "Two Zone Heart Rate Limit");
        attributes.put("00002A07-0000-1000-8000-00805f9b34fb".toLowerCase(), "Tx Power Level");
        attributes.put("00002AB4-0000-1000-8000-00805f9b34fb".toLowerCase(), "Uncertainty");
        attributes.put("00002A45-0000-1000-8000-00805f9b34fb".toLowerCase(), "Unread Alert Status");
        attributes.put("00002A9F-0000-1000-8000-00805f9b34fb".toLowerCase(), "User Control Point");
        attributes.put("00002A9A-0000-1000-8000-00805f9b34fb".toLowerCase(), "User Index");
        attributes.put("00002A76-0000-1000-8000-00805f9b34fb".toLowerCase(), "UV Index");
        attributes.put("00002A96-0000-1000-8000-00805f9b34fb".toLowerCase(), "VO2 Max");
        attributes.put("00002A97-0000-1000-8000-00805f9b34fb".toLowerCase(), "Waist Circumference");
        attributes.put("00002A98-0000-1000-8000-00805f9b34fb".toLowerCase(), "Weight");
        attributes.put("00002A9D-0000-1000-8000-00805f9b34fb".toLowerCase(), "Weight Measurement");
        attributes.put("00002A9E-0000-1000-8000-00805f9b34fb".toLowerCase(), "Weight Scale Feature");
        attributes.put("00002A79-0000-1000-8000-00805f9b34fb".toLowerCase(), "Wind Chill");


        // Sample Characteristics.
        attributes.put(HEART_RATE_MEASUREMENT, "Heart Rate Measurement");
        attributes.put(SOFTWARE_REVISION_STRING, "SOFTWARE_REVISION_STRING");
        attributes.put("00002a29-0000-1000-8000-00805f9b34fb", "Manufacturer Name String");
    }

    public static String lookup(String uuid, String defaultName) {
        String name = attributes.get(uuid);
        if (name == null) {
        } else {
            Log.d("test name", name);
        }

        Log.d("test", uuid);
        return name == null ? defaultName : name;
    }
}
