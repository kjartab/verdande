package com.example.android.bluetoothlegatt;

import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Location;
import android.location.LocationListener;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.util.Config;
import android.util.Log;
import android.widget.Toast;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;

public class NetworkService extends Service {

    private static String TAG = "NetworkService";

    public NetworkService() {

    }

    boolean mConnected;


    // Handles various events fired by the Service.
    // ACTION_GATT_CONNECTED: connected to a GATT server.
    // ACTION_GATT_DISCONNECTED: disconnected from a GATT server.
    // ACTION_GATT_SERVICES_DISCOVERED: discovered GATT services.
    // ACTION_DATA_AVAILABLE: received data from the device.  This can be a result of read
    //                        or notification operations.
    private final BroadcastReceiver mGattUpdateReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            if (BluetoothLeService.ACTION_DATA_AVAILABLE.equals(action)) {
                String data = intent.getStringExtra(BluetoothLeService.EXTRA_DATA);
                updateHeartRate(data);
            }
        }
    };

    private SensorManager mSensorManager;
    private float mAccel; // acceleration apart from gravity
    private float mAccelCurrent; // current acceleration including gravity
    private float mAccelLast; // last acceleration including gravity

    private final SensorEventListener mSensorListener = new SensorEventListener() {

        public void onSensorChanged(SensorEvent se) {
            float x = se.values[0];
            float y = se.values[1];
            float z = se.values[2];
            mAccelLast = mAccelCurrent;
            mAccelCurrent = (float) Math.sqrt((double) (x*x + y*y + z*z));
            //Log.v(TAG, Float.toString(mAccelCurrent));
            accQueue.add(Float.toString(mAccelCurrent));
            updateAcceleration();
            float delta = mAccelCurrent - mAccelLast;
            mAccel = mAccel * 0.9f + delta; // perform low-cut filter
        }

        public void onAccuracyChanged(Sensor sensor, int accuracy) {
        }
    };

    private Queue<String> hrQueue = new LinkedList<String>();
    private Queue<String> gpsQueue = new LinkedList<String>();
    private Queue<String> accQueue = new LinkedList<String>();

    class RequestTask extends AsyncTask<String, Void, String> {

        private Exception exception;

        protected String doInBackground(String... data) {
            try {

                //getRequest(data[0], data[1]);
                postRequest(data[0], data[1]);
                return "test";
            } catch (Exception e) {
                this.exception = e;
                Log.e(TAG, e.toString());
                return null;
            }
        }

        protected void onPostExecute(String str) {
            // TODO: check this.exception
            // TODO: do something with the feed
        }
    }



    public void postRequest(String urlString, String data) {

        final String postdata = data;


        URL url = null;
        try {
            url = new URL(urlString);
        } catch (MalformedURLException e) {
            Log.e(TAG, e.toString());
            return;
        }

        try {
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            try {
                urlConnection.setDoOutput(true);
                urlConnection.setChunkedStreamingMode(0);
                OutputStream os = urlConnection.getOutputStream();
                os.write(postdata.getBytes());
                os.flush();
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                readStream(in);
            }finally {
                urlConnection.disconnect();
            }

        } catch (Exception e) {
            Log.v(TAG, e.toString());
        }


    }

    public void getRequest(String urlString, String heartRate){

        Log.e(TAG, urlString);
        Log.e(TAG,"FAAEN");
        URL url = null;
        try {
            url = new URL(urlString + '/' + heartRate);
            Log.e(TAG, url.toString());
        } catch (MalformedURLException e) {
            Log.e(TAG, e.toString());
            return;
        }
        Log.e(TAG, url.toString());

        try {

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            try {
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                readStream(in);
            } catch (Exception e) {
                Log.e(TAG, e.toString());
            }
            finally{
                urlConnection.disconnect();
            }
        } catch (IOException e) {
            Log.e(TAG, e.toString());

        }
    }

    public void readStream(InputStream in) {
        try {
            BufferedReader r = new BufferedReader(new InputStreamReader(in));
            String x = "";
            x = r.readLine();
            String total = "";

            while(x!= null){
                total += x;
                x = r.readLine();
            }
            Log.i(TAG, total);
            Log.i("request", in.toString());
        } catch (Exception e) {

        }

    }

    private static IntentFilter makeGattUpdateIntentFilter() {
        final IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(BluetoothLeService.ACTION_GATT_CONNECTED);
        intentFilter.addAction(BluetoothLeService.ACTION_GATT_DISCONNECTED);
        intentFilter.addAction(BluetoothLeService.ACTION_GATT_SERVICES_DISCOVERED);
        intentFilter.addAction(BluetoothLeService.ACTION_DATA_AVAILABLE);
        return intentFilter;
    }


    @Override
    public IBinder onBind(Intent intent) {
        Log.i(TAG, "start");
        // TODO: Return the communication channel to the service.
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mSensorManager.registerListener(mSensorListener, mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER), SensorManager.SENSOR_DELAY_FASTEST);
        mAccel = 0.00f;
        mAccelCurrent = SensorManager.GRAVITY_EARTH;
        mAccelLast = SensorManager.GRAVITY_EARTH;
        registerReceiver(mGattUpdateReceiver, makeGattUpdateIntentFilter());
        Log.d(TAG, "FirstService created");


        //getRequest("http://www.kartan.no");
    }

    public void updateAcceleration() {
        if (accQueue.size()>500) {
            String accs = "";
            int count = 0;
            while (count<500) {
                accs = accs.concat(accQueue.remove());
                count ++;
            }
            String[] rt = {"http://www.kartan.no:8224", accs};
            new RequestTask().execute(rt);

        }
    }

    public void updateHeartRate(String heartRate) {
        String[] t = {"http://www.kartan.no:8224", heartRate};
        hrQueue.add(heartRate);

        if (hrQueue.size() > 9) {
            String hrs = "";
            int count = 0;
            while (count < 9) {
                hrs = hrs.concat(hrQueue.remove());
                count ++;
            }
            String[] rt = {"http://www.kartan.no:8224", hrs};
           // new RequestTask().execute(rt);
        }

    }
    @Override
    public void onDestroy() {
        // TODO Auto-generated method stub
        unregisterReceiver(mGattUpdateReceiver);

        mSensorManager.unregisterListener(mSensorListener);
        super.onDestroy();
        Log.d(TAG, "FirstService destroyed");
    }
}
