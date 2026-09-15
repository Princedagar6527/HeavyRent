import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Vehicle from "@/models/Vehicle";

export async function GET() {
  try {
    await dbConnect();

    // 1. Regional Fleet Vendor
    let demoVendor = await User.findOne({ phone: "9876543210" });
    if (!demoVendor) {
      demoVendor = await User.create({
        name: "NCR Earthmovers & Logistics",
        phone: "9876543210",
        email: "fleet.ncr@heavyrent.com",
        role: "VENDOR",
        isVerified: true,
      });
    }

    // 2. Clear previous fleet
    await Vehicle.deleteMany({ vendorId: demoVendor._id });

    // 3. Clean Fleet Dataset with Verified Machine Images
    const fleetData = [
      // ================= HAPUR FLEET =================
      {
        vendorId: demoVendor._id,
        title: "Mahindra Bolero Maxi Truck Plus Pickup",
        category: "TEMPO",
        registrationNo: "UP-37-B-7721",
        hourlyRate: 450,
        shiftRate: 3200,
        withOperator: true,
        withFuel: true,
        city: "Hapur",
        state: "Uttar Pradesh",
        images: [
          "https://assets.tractorjunction.com/truck-junction/assets/images/desciption-images/tata-407-gold-sfc-29-wb-1-1-1733114534.webp",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
       {
        vendorId: demoVendor._id,
        title: "JCB",
        category: "JCB",
        registrationNo: "UP-37-B-7722",
        hourlyRate: 800,
        shiftRate: 6400,
        withOperator: true,
        withFuel: true,
        city: "Hapur",
        state: "Uttar Pradesh",
        images: [
          "https://images.tractorjunction.com/Infrajunction-prod/jcb_2dx_backhoe_loader1686808847_55d61d5b43.jpg?format=webp&quality=40",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "Tata Ace Gold Commercial Pickup (Chota Hathi)",
        category: "TEMPO",
        registrationNo: "UP-37-C-9012",
        hourlyRate: 350,
        shiftRate: 2500,
        withOperator: true,
        withFuel: true,
        city: "Hapur",
        state: "Uttar Pradesh",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxBkmlt8eiE0ElsbqIVwF1kPouPyNySJtxojGhhtJO5-UQSIqnI8UHA0&s=10",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "JCB 3DX Super EcoXcellence (4x4)",
        category: "JCB",
        registrationNo: "UP-37-T-1142",
        hourlyRate: 1150,
        shiftRate: 8500,
        withOperator: true,
        withFuel: false,
        city: "Hapur",
        state: "Uttar Pradesh",
        images: [
          "https://desimachines.com/wp-content/uploads/2025/03/desi-machines-backhoe-loader-jcb-3dx-super-featured.webp",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "Tata Signa 2823.K Heavy Dumper (16 Cum)",
        category: "TIPPER",
        registrationNo: "UP-37-AT-4489",
        hourlyRate: 1300,
        shiftRate: 10000,
        withOperator: true,
        withFuel: false,
        city: "Hapur",
        state: "Uttar Pradesh",
        images: [
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },

      // ================= GHAZIABAD FLEET =================
      {
        vendorId: demoVendor._id,
        title: "JCB 4DX Heavy Duty Backhoe Loader",
        category: "JCB",
        registrationNo: "UP-14-BT-9021",
        hourlyRate: 1250,
        shiftRate: 9500,
        withOperator: true,
        withFuel: false,
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        images: [
          "https://desimachines.com/wp-content/uploads/2025/03/desi-machines-backhoe-loader-jcb-3dx-super-featured.webp",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "Tata 407 LPT Open Body Pickup Truck",
        category: "TEMPO",
        registrationNo: "UP-14-ET-6541",
        hourlyRate: 600,
        shiftRate: 4500,
        withOperator: true,
        withFuel: false,
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        images: [
          "https://assets.tractorjunction.com/truck-junction/assets/images/desciption-images/tata-407-gold-sfc-29-wb-1-1-1733114534.webp",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "Ashok Leyland 2518 Tipper / Dumper",
        category: "TIPPER",
        registrationNo: "UP-14-DT-3388",
        hourlyRate: 1400,
        shiftRate: 10800,
        withOperator: true,
        withFuel: false,
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaz3PMxX_3hOKmUPKdFE-k88w4qA4E_803E147epbyH1pMN9qFXhulSIhr&s=10",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "Eicher Pro City Delivery Pickup",
        category: "TEMPO",
        registrationNo: "UP-14-FT-1890",
        hourlyRate: 550,
        shiftRate: 4000,
        withOperator: true,
        withFuel: true,
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5g5vcRq5Ljh-aIGmr19wYmQN-XBJkrdSyHGZhkgBo-vaT09Dw-XWCsY4Y&s=10",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },

      // ================= NOIDA FLEET =================
      {
        vendorId: demoVendor._id,
        title: "JCB 3DX Plus Excavator-Loader",
        category: "JCB",
        registrationNo: "UP-16-Z-5501",
        hourlyRate: 1200,
        shiftRate: 9000,
        withOperator: true,
        withFuel: true,
        city: "Noida",
        state: "Uttar Pradesh",
        images: [
          "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "Mahindra Supro Maxi Pickup",
        category: "TEMPO",
        registrationNo: "UP-16-CT-8120",
        hourlyRate: 400,
        shiftRate: 3000,
        withOperator: true,
        withFuel: true,
        city: "Noida",
        state: "Uttar Pradesh",
        images: [
          "https://assets.tractorjunction.com/truck-junction/assets/images/truck/supro-maxitruck-1614684208.webp",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "BharatBenz 2823C Mining Dumper",
        category: "TIPPER",
        registrationNo: "UP-16-BT-2099",
        hourlyRate: 1500,
        shiftRate: 11500,
        withOperator: true,
        withFuel: false,
        city: "Noida",
        state: "Uttar Pradesh",
        images: [
          "https://5.imimg.com/data5/QU/HH/OV/GLADMIN-105612/bharatbenz-1623c-tipper-truck-gvw-16200-kg.jpg",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
      {
        vendorId: demoVendor._id,
        title: "Tata Prima Heavy Quarry Dumper",
        category: "TIPPER",
        registrationNo: "UP-16-ET-7002",
        hourlyRate: 1800,
        shiftRate: 14000,
        withOperator: true,
        withFuel: false,
        city: "Noida",
        state: "Uttar Pradesh",
        images: [
          "https://trucks.tatamotors.com/assets/trucks/files/trucks/2025-03/tata-prima-3530k-hrt.jpg?VersionId=ksN2G7RcUHQ1BokfaQVUC5zLqREGkQN6",
        ],
        rcDocument: "verified",
        isKycVerified: true,
        isAvailable: true,
      },
    ];

    await Vehicle.insertMany(fleetData);

    return NextResponse.json({
      success: true,
      message: `Updated ${fleetData.length} vehicles with authentic pickup trucks, dumpers & JCBs!`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}